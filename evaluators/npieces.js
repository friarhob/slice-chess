class NPieces {
    constructor()
    {
    }
    
    eval(fen)
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
    
    toString()
    {
        return {
            id: "npieces",
            description: "return the sum of pieces in table (White positive, Black negative, P=10, BN=30, R=50, Q=90, K=900)"
        };
    }
}

module.exports = { NPieces }
