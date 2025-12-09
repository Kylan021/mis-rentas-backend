
module.exports = (sequelize, DataTypes) => {

    const Property = sequelize.define('Property', {

        ownerId: {

            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'owner_id'

        },

        title: {

            type: DataTypes.STRING(150),
            allowNull: false,
            
        },

        description: {

            type: DataTypes.TEXT,
            allowNull: true,

        },

        maxGuests: {

            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'max_guests'

        },

        basePricePerNight: {

            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: 'base_price_per_night'

        }
   
    }, 
    {

        tableName: 'properties',

    });

    return Property;

};