// class Game1 {
//     constructor(player1, player2) {
//         this.player1 = player1;
//         this.player2 = player2;
//         this.move = [];           
//         this.position = []; 
//         this.startTime = new Date();  
//         this.ludoBoard = [];       
//     }

//     makeMove(socket, move) {
//         if (socket !== this.player1 && socket !== this.player2) {
//             console.log("User is not a valid player");
//             return;
//         }

//         if (!move || move.pieceIndex === undefined || typeof move.steps !== "number") {
//             socket.emit("invalid_move", { error: "Invalid move format!" });
//             return;
//         }
        
//         this.moves.push({ player: socket, position });
//         console.log(`Move made by player: ${JSON.stringify(this.position)}`);
//     }
// }

// module.exports = Game1;


// class LudoGame {
//     constructor() {
//         this.positions = new Array(52).fill(null);
//         this.homeBases = {
//             'red': [0, 1, 2, 3],
//             'green': [0, 1, 2, 3],
//             'yellow': [0, 1, 2, 3],
//             'blue': [0, 1, 2, 3]
//         };
//         this.homeStreaks = {
//             'red': [51, 52, 53, 54, 55, 56],
//             'green': [12, 13, 14, 15, 16, 17],
//             'yellow': [25, 26, 27, 28, 29, 30],
//             'blue': [38, 39, 40, 41, 42, 43]
//         };
//         this.startPositions = {
//             'red': 0,
//             'green': 13,
//             'yellow': 26,
//             'blue': 39
//         };
//     }

//     isValidMove(player, pieceIndex, diceValue) {
//         const piece = player.pieces[pieceIndex];
        
//         if (piece.isHome) {
//             return diceValue === 6;
//         }

//         if (piece.inPlay) {
//             const newPosition = this.calculateNewPosition(piece.position, diceValue, player.color);
//             return this.isPositionAvailable(newPosition, player.color);
//         }

//         return false;
//     }

//     makeMove(player, pieceIndex, diceValue) {
//         if (!this.isValidMove(player, pieceIndex, diceValue)) {
//             return false;
//         }

//         const piece = player.pieces[pieceIndex];

//         if (piece.isHome && diceValue === 6) {
//             piece.isHome = false;
//             piece.inPlay = true;
//             piece.position = this.startPositions[player.color];
//             return true;
//         }

//         if (piece.inPlay) {
//             const newPosition = this.calculateNewPosition(piece.position, diceValue, player.color);
//             piece.position = newPosition;
//             return true;
//         }

//         return false;
//     }

//     calculateNewPosition(currentPosition, steps, playerColor) {
//         let newPosition = currentPosition + steps;
//         if (newPosition >= 52) {
//             newPosition = newPosition - 52;
//         }
//         return newPosition;
//     }

//     isPositionAvailable(position, playerColor) {
//         return !this.positions[position] || this.positions[position].color !== playerColor;
//     }
// }

// module.exports = LudoGame;


class LudoGame {
    constructor() {
        // Keep existing initialization
        this.positions = new Array(52).fill(null);
        this.homeBases = {
            'red': [0, 1, 2, 3],
            'green': [0, 1, 2, 3],
            'yellow': [0, 1, 2, 3],
            'blue': [0, 1, 2, 3]
        };
        this.homeStreaks = {
            'red': [51, 52, 53, 54, 55, 56],
            'green': [12, 13, 14, 15, 16, 17],
            'yellow': [25, 26, 27, 28, 29, 30],
            'blue': [38, 39, 40, 41, 42, 43]
        };
        this.startPositions = {
            'red': 0,
            'green': 13,
            'yellow': 26,
            'blue': 39
        };
        // Add current turn tracking
        this.currentTurn = null;
        this.currentDiceValue = null;
        this.players = [];
    }

    initializeGame(players) {
        this.players = players;
        this.currentTurn = players[0].id;
        return this.getGameState();
    }             

    isValidMove(player, pieceIndex, diceValue) {
        const piece = player.pieces[pieceIndex];
        
        // Must have rolled dice first
        if (!diceValue) {
            return false;
        }
        
        // Can only move out of home with a 6
        if (piece.isHome) {
            return diceValue === 6;
        }

        if (piece.inPlay) {
            const newPosition = this.calculateNewPosition(piece.position, diceValue, player.color);
            // Check if position is available and not occupied by same color
            return this.isPositionAvailable(newPosition, player.color);
        }

        return false;
    }

    makeMove(player, pieceIndex, diceValue) {
        if (!this.isValidMove(player, pieceIndex, diceValue)) {
            return false;
        }

        const piece = player.pieces[pieceIndex];
        const oldPosition = piece.position;

        // Moving out of home
        if (piece.isHome && diceValue === 6) {
            piece.isHome = false;
            piece.inPlay = true;
            piece.position = this.startPositions[player.color];
            this.positions[piece.position] = { color: player.color, pieceIndex };
            return true;
        }

        // Moving on board
        if (piece.inPlay) {
            const newPosition = this.calculateNewPosition(oldPosition, diceValue, player.color);
            
            // Handle capture
            if (this.positions[newPosition] && this.positions[newPosition].color !== player.color) {
                const capturedPiece = this.positions[newPosition];
                const capturedPlayer = this.players.find(p => p.color === capturedPiece.color);
                if (capturedPlayer) {
                    capturedPlayer.pieces[capturedPiece.pieceIndex].isHome = true;
                    capturedPlayer.pieces[capturedPiece.pieceIndex].inPlay = false;
                    capturedPlayer.pieces[capturedPiece.pieceIndex].position = 0;
                }
            }

            // Update positions
            this.positions[oldPosition] = null;
            this.positions[newPosition] = { color: player.color, pieceIndex };
            piece.position = newPosition;
            return true;
        }

        return false;
    }

    calculateNewPosition(currentPosition, steps, playerColor) {
        let newPosition = currentPosition + steps;
        
        // Handle entering home streak
        const props = this.homeStreaks[playerColor];
        if (props && this.shouldEnterHomeStreak(currentPosition, newPosition, playerColor)) {
            return props[0]; // Enter home streak
        }
        
        // Handle board wraparound
        if (newPosition >= 52) {
            newPosition = newPosition - 52;
        }
        
        return newPosition;
    }

    shouldEnterHomeStreak(currentPosition, newPosition, playerColor) {
        const startPos = this.startPositions[playerColor];
        return currentPosition < startPos && newPosition >= startPos;
    }

    isPositionAvailable(position, playerColor) {
        return !this.positions[position] || this.positions[position].color !== playerColor;
    }

    getGameState() {
        return {
            positions: this.positions,
            currentTurn: this.currentTurn,
            diceValue: this.currentDiceValue,
            players: this.players
        };
    }

    rollDice() {
        this.currentDiceValue = Math.floor(Math.random() * 6) + 1;
        return this.currentDiceValue;
    }

    updateTurn(diceValue) {
        // Keep same turn if rolled 6, otherwise move to next player
        if (diceValue !== 6) {
            const currentPlayerIndex = this.players.findIndex(p => p.id === this.currentTurn);
            const nextPlayerIndex = (currentPlayerIndex + 1) % this.players.length;
            this.currentTurn = this.players[nextPlayerIndex].id;
        }
    }
}

module.exports = LudoGame;