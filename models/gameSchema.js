



const mongoose = require('mongoose');
const { number } = require('zod');
// const { string } = require('zod');
// { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
const gameSchema = new mongoose.Schema({
    roomCode: String,
    players: [{
        id: String,
        name: String,
        color: String,
        pieces: [{
            position: Number,
            dice: Boolean,
            inPlay: Boolean,
        
        }],
        Time:String,
        betAmount:Number
    }],
    currentTurn: String,
    winner: String,
    status: {
        type: String,
        enum: ['waiting', 'playing', 'completed'],
        default: 'waiting'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    

});

module.exports = mongoose.model('Game', gameSchema);

















   































































































































































9