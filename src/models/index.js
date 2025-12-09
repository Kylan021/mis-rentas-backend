
const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Property = require("./property")(sequelize, Sequelize.DataTypes);
const Booking = require("./booking")(sequelize, Sequelize.DataTypes);
const BlockedDate = require("./blockedDate")(sequelize, Sequelize.DataTypes);

User.hasMany(Property, { foreignKey: 'owner_id', as: 'properties' });
Property.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });

User.hasMany(Booking, { foreignKey: 'traveler_id', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'traveler_id', as: 'traveler' });

Property.hasMany(Booking, { foreignKey: 'property_id', as: 'bookings' });
Booking.belongsTo(Property, { foreignKey: 'property_id', as: 'property' });

Property.hasMany(BlockedDate, { foreignKey: 'property_id', as: 'blockedDates' });
BlockedDate.belongsTo(Property, { foreignKey: 'property_id', as: 'property' });

const db = {
    sequelize,
    Sequelize,
    User,
    Property,
    Booking,
    BlockedDate
};

module.exports = db;
