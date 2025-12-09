
const { Sequelize } = require("sequelize");

const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {

    host: DB_HOST,
    port: DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
    define: {

        timestamps: true,
        underscored: true

    }

});

module.exports = sequelize;
