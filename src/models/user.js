
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {

        name: {

            type: DataTypes.STRING(100),
            allowNull: false

        },

        email: {

            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
            validate: {

                isEmail: true

            }

        },

        passwordHash: {

            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'password_hash'

        },

        role: {

            type: DataTypes.ENUM('owner', 'traveler'),
            allowNull: false

        }
   
    }, 
    {

        tableName: 'users',

    });

    return User;

};