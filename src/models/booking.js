
module.exports = (sequelize, DataTypes) => {

    const Booking = sequelize.define('Booking', {

        propertyId: {

            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'property_id'

        },

        travelerId: {

            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'traveler_id'
            
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

        guests: {

            type: DataTypes.INTEGER,
            allowNull: false

        },

        status: {

            type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'CANCELLED'),
            allowNull: false,
            defaultValue: 'PENDING'

        },

        totalPrice: {

            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: 'total_price'

        }
   
    }, 
    {

        tableName: 'bookings',

    });

    return Booking;

};