class NPieces {
    constructor(fen)
    {
        if(fen) {
            this.fen = fen.split(" ")[0];
            if ((new RegExp("/^[prnbqkPRNBQK12345678]*\/{7}[prnbqkPRNBQK12345678]*/")).test(fen))
                throw("Not a valid FEN string");
        }
    }
    
    eval()
    {
        var table=this.fen.split(" ")[0];
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
    
    toString()
    {
        return {eval: this.eval()};
    }
}

module.exports = { NPieces }
