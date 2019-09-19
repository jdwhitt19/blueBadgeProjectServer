let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let Operator = sequelize.import('../models/operator');

router.get('/:name', function (req, res) {
    
    console.log(req);
    Operator.findOne({where: {name: req.params.name}})
    .then(
        function findOpSuccess (operator) {
            res.json(operator);
        },
        function findOpError (err) {
            res.send(err.message);
        }
    );
});

router.post('/createoperator', function (req, res) {
    
    console.log(req);
    
    let name = req.body.operator.name;
    let unit = req.body.operator.unit;
    let side = req.body.operator.side;
    let role = req.body.operator.role;
    let stats = req.body.operator.stats;
    let loadout = req.body.operator.loadout;
    let ability = req.body.operator.ability;

    Operator.create({

        name: name,
        unit: unit,
        side: side,
        role: role,
        stats: stats,
        loadout: loadout,
        ability: ability

    }).then(

        function createSuccess (operator) {
            res.json({
                operator: operator,
                message: 'operator added into database'
            });
        },
        function createError (err) {
            res.send(500, err.message);
        }
    );
}); 

module.exports = router;