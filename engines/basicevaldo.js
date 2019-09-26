var Chess = require('chess.js').Chess;


/* Random movements */
class BasicEvaldo {
    evalTable(fen)
    {
        var table=fen.split(" ")[0];
        const base = table.length;
        var resEval=0;

        resEval+=(base-table.replace("P","").length)*10;
        resEval+=(base-table.replace("N","").length)*30;
        resEval+=(base-table.replace("B","").length)*30;
        resEval+=(base-table.replace("R","").length)*50;
        resEval+=(base-table.replace("Q","").length)*90;
        resEval+=(base-table.replace("K","").length)*900;

        resEval-=(base-table.replace("p","").length)*10;
        resEval-=(base-table.replace("n","").length)*30;
        resEval-=(base-table.replace("b","").length)*30;
        resEval-=(base-table.replace("r","").length)*50;
        resEval-=(base-table.replace("q","").length)*90;
        resEval-=(base-table.replace("k","").length)*900;

        return resEval;
    }
    shuffleArray(array)
    {
        for (var i = array.length - 1; i > 0; i--) 
        {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    nextMove(fen)
    {
        var game = new Chess(fen);
        var validMoves = this.shuffleArray(game.moves());
        if(validMoves.length == 0) return "gameover";
        var bestMove = validMoves[0];
        game.move(bestMove);
        var bestEval = this.evalTable(game.fen());
        game.undo();
        for(var i = 1; i < validMoves.length; i++)
        {
            game.move(validMoves[i]);
            var curEval = this.evalTable(game.fen());
            game.undo();
            if(curEval > bestEval)
            {
                bestEval = curEval;
                bestMove = validMoves[i];
            }
        }
        return bestMove;
    }

    toString() {
        return ({
            id: "basicevaldo",
            description: "A mover based on evaluation of table after next move"
        });
    }
}

module.exports = { BasicEvaldo };
