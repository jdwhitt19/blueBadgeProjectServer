let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

router.post('/createuser', function (req, res) {

    let username = req.body.user.username;
    let pass = req.body.user.password;

    User.create({

        username: username,
        password: bcrypt.hashSync(pass, 10)

    }).then(
        
        function createSuccess (user) {

            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1 day'});

            res.json({
                user: user,
                message: 'user created',
                sessionToken: token
            });
        },
        function createError (err) {
            res.send(500, err.message);
        }
    );
});

router.post('/signin', function (req, res) {
    
    User.findOne({where: {username: req.body.user.username}}).then(
        function (user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
                    if (matches) {
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1 day'});
                        res.json({
                            user: user,
                            message: "successful login",
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({error: "login failed"});
                    }
                });
            } else {
                res.status(500).send({error: "failed to login"});
            }
        },
        function (err) {
            res.status(501).send({error: "unexpected error"});
        }
    );
});

/* Unlike the other user routes, these ones are protected because you must have a session token in order to be able to delete/update your account */

router.delete('/', function (req, res) {
    
    User.destroy({
        where: {id: req.user.id}
    }).then(
        function deleteUserSuccess (user) {
            res.send(200, "user deleted");
        },
        function deleteUserFailure (err) {
            res.send(500, err.message);
        }
    );
});

router.put('/username', function (req, res) {
    
    User.update(
        {username: req.body.user.username},
        {where: {id: req.user.id}},
        console.log(req)
    ).then(
        function updateSuccess () {
            res.send(200, "username successfully updated");
        },
        function updateError (err) {
            res.send(500, err.message);
        }
    );
});

module.exports = router;