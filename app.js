var express = require("express");
var port = process.env.PORT || 8000;

var engines = {
    randony: new (require('./engines/randony.js').Randony)()
};

var app = express();

app.get('/', function(req, res) {
    res.send(JSON.stringify({ Hello: "World" }));
});

app.get('/about', function(req, res) {
    res.send(JSON.stringify({ About: "me" }));
});

app.get('/engines/:id', function(req, res) {
    var move;
    move = engines[req.params.id].nextMove(req.query.fen);
    res.send(JSON.stringify({nextMove: move}));
});

app.get('/engines', function(req, res) {
    var enginesDesc = [];
    engines.forEach(function (item, index) {
//        console.log(item.toString());
        enginesDesc.push(item.toString());
    });  
    res.send(JSON.stringify({ engineIDs: enginesDesc }));
});


app.listen(port, function () {
 console.log(`app listening on port 8000!`);
});
