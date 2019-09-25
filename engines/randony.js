var Chess = require('chess.js').Chess;


/* Random movements */
class Randony {
    nextMove(fen)
    {
        var game = new Chess(fen);
        var validMoves = game.moves();
        if(validMoves.length == 0) return "gameover";
        return validMoves[Math.floor(Math.random() * validMoves.length)];
    }

    toString() {
        return ({
            id: "randony",
            description: "A random mover"
        });
    }
}

module.exports = { Randony };
