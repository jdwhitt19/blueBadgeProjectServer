require('dotenv').config();

let express = require('express');
let app = express();
let user = require('./controllers/userController');
let operator = require('./controllers/operatorController');
let sequelize = require('./db');

sequelize.sync();

app.use(express.json());

app.use(require('./middleware/headers'));

// Exposed Routes

app.use('/user', user);

// Protected Routes

app.use(require('./middleware/validate-session')); // the inclusion of the validate-session middleware is why these routes are protected
app.use('/operator', operator);
app.use('/deleteuser', user);
app.use('/updateuser', user);

app.listen(3000, function () {
    console.log('App is listening on 3000.')
});