const { v4: uuidv4 } = require('uuid');
const Game = require('../models/gameSchema');
const LudoGame = require('../middleware/game');
const gameSchema = require('../models/gameSchema');

class GameManager {
    constructor() {
        this.activeGames = new Map();
        this.playerSockets = new Map();
        this.waitingRoom = new Set();
    }

    handleConnection(socket) {
        console.log("New player connected");
        const playerId = uuidv4();
        console.log("Player ID:", playerId);
        this.playerSockets.set(playerId, socket);
        this.setupSocketListeners(socket);

        socket.on('error', (err) => {
            console.error(`WebSocket : ${err.message || err}`);
        });
    }

    setupSocketListeners(socket) {
        console.log("Setting up socket listeners--->");
       
        socket.on('message', async (data) => {
            try {
                console.log("Received message event", data);
                const message = JSON.parse(data);
                console.log(message);
                
                if (message.type == "chat") {
                    console.log("Processing join_room request  line  number1");
                    console.log("this  line for  message");
                    console.log(message)
                    const { roomCode } = message;
                    const {username , playerId , phone , selectedColor,time,amount}   = message.payload.message

                    console.log("this is data" , {username , phone  , selectedColor});

                    console.log(roomCode , "value of roomCode");
                    const valueofRoom =  await Game.find({roomCode})
                    console.log('value - of roomCode 3' , valueofRoom)
                    if (valueofRoom.length>0) {
                        await this.joinGame(playerId, roomCode,username, socket ,selectedColor,time,amount);
                        console.log("this is madara"   ,  playerId , username);
                        
                    } else {
                        console.log("this is player Id" ,playerId,username) ;
                        await this.createGame(playerId,roomCode,username, socket,selectedColor,time,amount);
                    }
                }
                
                if(message.type == "update"){
                    var {player}  = message.payload.message;

                console.log("this  is  player" , player);
                }
                if(message.type == "update" && player != undefined ){
                        console.log("this is messgetype-box")
                        const {roomCode}   = message
                        const{playerId , player , cubes}  = message.payload.message ;
                        const ind =  player % 100 ;
                        // const findQuery = await Game.findOne({
                        //     roomCode,
                        //     "players.id": playerId,
                        //     [`players.pieces.${ind}.position`]: { $exists: true }
                        // });

                        const updatedGame = await Game.findOneAndUpdate(
                            { roomCode, "players.id": playerId },
                            { $inc: { [`players.$.pieces.${ind}.position`]: parseInt(cubes)  } ,
                              $set: { [`players.$.pieces.${ind}.inPlay`]: true } 
                           },
                            { new: true} // Returns the updated document
                        );


                        console.log("this  is updated query",updatedGame);

                        const updateMessage = {
                            type: "gameUpdate",
                            roomCode: roomCode,
                            payload: {
                                message: {
                                    gameState: updatedGame,
                                    lastMove: {
                                        playerId,
                                        player,
                                        position: parseInt(cubes),
                                        timestamp: new Date()
                                    }
                                }
                            }
                        };


                        socket.send(JSON.stringify(updateMessage));
                        console.log("boardcast work successfull");
                        
                       
                        
                }
                
            } catch (error) {
                console.error("Error handling message event:", error);
                socket.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
            }
        });

       
    }

    async createGame(playerId, roomCode, username , socket  ,  selectedColor,time,amount) {
        try {
            const room = roomCode ;
            const game = new Game({
                roomCode:room,
                players: [{
                    id: playerId,
                    name: username,
                    color: selectedColor,
                    pieces: Array(4).fill({ position: 0, isHome: true, inPlay: false }),
                    Time:time,
                    betAmount:amount
                }],
                status: 'waiting',
             

               
            });

            await game.save();
            this.activeGames.set(roomCode, new LudoGame());
            
            socket.send('game_created', {
                roomCode,
                playerId,
                username
            });
        } catch (error) {
            console.error("Error creating game:", error);
            socket.send('error', { message: 'Failed to create game' });
        }
    }

    async joinGame(playerId, roomCode, username, socket , selectedColor,time,amount) {
        try {
            const game = await Game.findOne({ roomCode });
            if (!game || game.players.length >= 4) {
                console.log("Join game failed: Room not found or full");
                socket.send('error', { message: 'Unable to join game' });
                return;
            }

            
            
            game.players.push({
                id: playerId,
                name: username,
                color: selectedColor,
                pieces: Array(4).fill({ position: 0 , isHome: true, inPlay: false }),
                Time:time,
                betAmount:amount
                
            });

            if (game.players.length >= 2) {
                game.status = 'playing';
                game.currentTurn = game.players[0].id;
            }

            await game.save();
            // this.broadcastGameUpdate(roomCode, game);
        } catch (error) {
            console.error("Error joining game:", error);
            socket.send('error', { message: 'An error occurred while joining the game' });
        }
    }

}

module.exports = GameManager ;      





/*
      
*/



    




         




