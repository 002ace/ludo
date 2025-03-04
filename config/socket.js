
const { Server } = require("ws");

const  GameManager  =  require("../middleware/gameManager")
const  Game  =   require("../models/gameSchema");



const initializeSocket = (server) => {  




const wss = new Server({ server });
const gameManager = new GameManager();


let allSocket = [];
wss.on('connection', (socket) => {
    gameManager.handleConnection(socket);
    allSocket.push(socket);
    socket.on('message' , async(message)=>{
         
        const parseMessage = JSON.parse(message);
        console.log(parseMessage);
        // let id  = parseMessage.payload.message.playerId ;
        // console.log(parseMessage.payload.message.playerId) 


        if(parseMessage.type == "chat" )
        {
               const cuurenUserRoom  =  allSocket.filter((x) => x.roomId === parseMessage.roomCode); 
               
               
               for(let i = 0 ; i<allSocket.length ;i++)
                {
                      if(allSocket[i].roomId == cuurenUserRoom?.roomId)
                      {
                          //    allSocket[i].send(parseMessage.payload.message);
                          // allSocket[i].send(JSON.stringify(parseMessage));

                          // // allSocket[i].send(JSON.stringify({type: "playerDetails", userDetails}));


                          // console.log(JSON.stringify(parseMessage));

                          setTimeout(() => {
                            allSocket[i].send(JSON.stringify(parseMessage));
                            console.log(JSON.stringify(parseMessage));
                        }, 1000);  // Delay for 500ms
                      }
                }

             
        }


        if(parseMessage.type == "sync_state")
        {
              const cuurenUserRoom  =  allSocket.filter((x) => x.roomId === parseMessage.roomCode);
              for(let i = 0 ; i<allSocket.length ;i++)
                {
                      if(allSocket[i].roomId == cuurenUserRoom?.roomId)
                      {
                          //    allSocket[i].send(parseMessage.payload.message);
                          allSocket[i].send(JSON.stringify(parseMessage));

                          // allSocket[i].send(JSON.stringify({type: "playerDetails", userDetails}));
                          

                          //    console.log(parseMessage.payload.message);
                      }
                }
        }

         if(parseMessage.type == "update")
            {
                //     =  allSocket.find((x)=>x.socket != socket);
                  const cuurenUserRoom  =  allSocket.filter((x) => x.roomId === parseMessage.roomCode);

                //   const  userDetails =  await Game.findOne({ "players.id": id });


                //   console.log(userDetails)

                  for(let i = 0 ; i<allSocket.length ;i++)
                  {
                        if(allSocket[i].roomId == cuurenUserRoom?.roomId)
                        {
                            //    allSocket[i].send(parseMessage.payload.message);
                            allSocket[i].send(JSON.stringify(parseMessage));

                            // allSocket[i].send(JSON.stringify({type: "playerDetails", userDetails}));


                            //    console.log(parseMessage.payload.message);
                        }
                  }
         }


         if(parseMessage.type == "dice_roll")
         {   
               const cuurenUserRoom  =  allSocket.filter((x) => x.roomId === parseMessage.roomCode);  

             
               
               for(let  i = 0 ; i<allSocket.length ; i++)
               {   
                     if(allSocket[i].roomId == cuurenUserRoom?.roomId)
                     {
                          // allSocket[i].send(JSON.stringify(parseMessage));
                          try {
                            const messageToSend = JSON.stringify(parseMessage);
                            console.log("Sending:", messageToSend);
                            allSocket[i].send(messageToSend);
                        } catch (err) {
                            console.error("Error sending message:", err);
                        }
                     }
                   
               }

         }


         if(parseMessage.type  == "turn_update")
         {
              const cuurenUserRoom  =  allSocket.filter((x) => x.roomId === parseMessage.roomCode); 

              for(let  i = 0 ; i<allSocket.length ; i++)
                {   
                      if(allSocket[i].roomId == cuurenUserRoom?.roomId)
                      {
                           // allSocket[i].send(JSON.stringify(parseMessage));
                           try {
                             const messageToSend = JSON.stringify(parseMessage);
                             console.log("Sending:", messageToSend);
                             allSocket[i].send(messageToSend);
                         } catch (err) {
                             console.error("Error sending message:", err);
                         }
                      }
                    
                }
         }




    })
});



  
};

module.exports = initializeSocket;  




