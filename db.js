const Sequelize = require('sequelize');

const sequelize = new Sequelize('bluebadgeprojectserver', 'postgres', 'JuicyMinotaurr', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function () {
        console.log('Connected to bluebadgeprojectserver postgres database.');
    },
    function (err) {
        console.log(err);
    }
);

module.exports = sequelize;