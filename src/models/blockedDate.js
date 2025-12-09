
module.exports = (sequelize, DataTypes) => {

    const BlockedDate = sequelize.define('BlockedDate', {

        propertyId: {

            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'property_id'

        },

        startDate: {

            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'start_date'

        },

        endDate: {

            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'end_date'

        },

        reason: {

            type: DataTypes.STRING(255),
            allowNull: true

        }
   
    }, {

        tableName: 'blocked_dates',

    });

    return BlockedDate;

};