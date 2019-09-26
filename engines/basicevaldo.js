var Chess = require('chess.js').Chess;


/* Random movements */
class BasicEvaldo {
    evalTable(fen)
    {
        var table=fen.split(" ")[0];
        const base = table.length;
        var resEval=0;

        resEval+=(base-table.replace(/P/g,"").length)*10;
        resEval+=(base-table.replace(/N/g,"").length)*30;
        resEval+=(base-table.replace(/B/g,"").length)*30;
        resEval+=(base-table.replace(/R/g,"").length)*50;
        resEval+=(base-table.replace(/Q/g,"").length)*90;
        resEval+=(base-table.replace(/K/g,"").length)*900;

        resEval-=(base-table.replace(/p/g,"").length)*10;
        resEval-=(base-table.replace(/n/g,"").length)*30;
        resEval-=(base-table.replace(/b/g,"").length)*30;
        resEval-=(base-table.replace(/r/g,"").length)*50;
        resEval-=(base-table.replace(/q/g,"").length)*90;
        resEval-=(base-table.replace(/k/g,"").length)*900;

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
            if(curEval < bestEval)
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
