const express = require("express");
const port = process.env.PORT || 8000;
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
  swaggerDefinition: {
    info: {
        title: "SLICE - Set of Learning and Immutable Chess Engines",
        version: "1.0.0",
        host: "https://slice-chess.herokuapp.com/",
        "base-path": "/",
        openapi: "3.0.0"
   },
  },
  apis: ['app.js', 'endpoints/*.js'],
};
const specs = swaggerJsdoc(options);
const cors = require("cors");

var engines = {
    randony: new (require('./engines/randony.js').Randony)(),
    basicevaldo: new (require('./engines/basicevaldo.js').BasicEvaldo)()
};



var evaluators = {
    npieces: new (require('./evaluators/npieces.js').NPieces)()
};

var app = express();

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', function(req, res) {
    res.redirect('/api-docs');
});
app.get('/about', function(req, res) {
    res.send(JSON.stringify({ Author: "Friar Hob" }));
});

/**
 * @swagger
 * /engines:
 *      get:
 *          description: This should return a list with all engines available
 *      
 */
app.get('/engines', function(req, res) {
    var enginesDesc = [];
    for(var item in engines) {
        console.log(item.toString());
        enginesDesc.push(item.toString());
    }  
    res.send(JSON.stringify({ engineIDs: enginesDesc }));
});

/**
 * @swagger
 * /engines/{id}:
 *      get:
 *          description: next move from engine represented by ID
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: the ID of the engine
 *          - in: query
 *            name: fen
 *            description: FEN representation of current board
 */
app.get('/engines/:id', function(req, res) {
    var move;
    move = engines[req.params.id].nextMove(req.query.fen);
    res.send(JSON.stringify({nextMove: move}));
});

/**
 * @swagger
 * /evaluators:
 *      get:
 *          description: This should return a list with all evaluators available
 *      
 */
app.get('/evaluators', function(req, res) {
    var evaluatorsDesc = [];
    for(var item in evaluators) {
        console.log(item.toString());
        evaluatorsDesc.push(item.toString());
    }  
    res.send(JSON.stringify({ evaluatorIDs: evaluatorsDesc }));
});

/**
 * @swagger
 * /evaluators/{id}:
 *      get:
 *          description: description of the evaluator behaviour
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: the ID of the evaluator
 */
app.get('/evaluators/:id', function(req, res) {
    res.send(JSON.stringify(evaluators[req.params.id].toString()));
});

/**
 * @swagger
 * /evaluators/{id}/{fen}:
 *      get:
 *          description: return the evaluation for the table represented by FEN
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: the ID of the evaluator
 *          - in: path
 *            name: fen
 *            required: true
 *            description: the FEN to be evaluated 
 */

app.get('/evaluators/:id/:fen', function(req, res) {
    var evaluation;
    evaluation = evaluators[req.params.id].eval(req.params.fen);
    res.send(JSON.stringify({eval: evaluation}));
});


app.listen(port, function () {
 console.log(`app listening on port 8000!`);
});
