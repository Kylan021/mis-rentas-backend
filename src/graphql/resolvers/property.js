const { Op } = require("sequelize");
const { requireRole } = require("../../utils/validation");

const propertyResolvers = {

    Query: {

        async myProperties(_, __, { user, models }) {

            requireRole(user, "owner");

            return models.Property.findAll({

                where: { ownerId: user.id },
                order: [["id", "ASC"]]

            });
            
        },

        async property(_, { id }, { models }) {

            return models.Property.findByPk(id);

        },

        async searchAvailableProperties(_, { start, end, guests }, { models }) {

            const startDate = new Date(start);
            const endDate = new Date(end);

            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {

                throw new Error('Invalid date format. Use YYYY-MM-DD');
            
            }

            if (startDate >= endDate) {
            
                throw new Error('Start date must be before end date');
            
            }

            if (guests <= 0) {
            
                throw new Error('Guests must be greater than 0');
            
            }

            const properties = await models.Property.findAll({
            
                where: {
            
                    maxGuests: {
            
                        [Op.gte]: guests,
            
                    },
                
                },
            
            });

            if (properties.length === 0) {
            
                return [];
            
            }

            const startStr = start;
            const endStr = end;

            const available = [];

            for (const property of properties) {
        
                const overlappingBookings = await models.Booking.count({
        
                    where: {

                        propertyId: property.id,
                        status: 'CONFIRMED',
                        [Op.and]: [

                            { startDate: { [Op.lte]: endStr } },
                            { endDate: { [Op.gte]: startStr } },

                        ],
                    },
                });

                if (overlappingBookings > 0) {

                    continue;

                }

                const overlappingBlocks = await models.BlockedDate.count({
                
                    where: {
                        propertyId: property.id,
                        [Op.and]: [

                            { startDate: { [Op.lte]: endStr } },
                            { endDate: { [Op.gte]: startStr } },

                        ],
                    },
                });

                if (overlappingBlocks > 0) {

                    continue;

                }

                available.push(property);
            }

            return available;
        },

    },

    Mutation: {

        async createProperty(_, { title, description, maxGuests, basePricePerNight }, { user, models }) {

            requireRole(user, "owner");

            const property = await models.Property.create({

                ownerId: user.id,
                title,
                description,
                maxGuests,
                basePricePerNight

            });

            return property;

        },

        async updateProperty(_, { id, title, description, maxGuests, basePricePerNight }, { user, models }) {

            requireRole(user, "owner");

            const property = await models.Property.findByPk(id);

            if (!property) {

                throw new Error("Property not found");

            }

            if (property.ownerId !== user.id) {

                throw new Error("Not authorized to update this property");
                

            }

            if (typeof title === "string") property.title = title;
            if (typeof description === "string") property.description = description;
            if (typeof maxGuests === "number") property.maxGuests = maxGuests;
            if (typeof basePricePerNight === "number") property.basePricePerNight = basePricePerNight;

            await property.save();

            return property;

        },

        async deleteProperty(_, { id }, { user, models }) {

            requireRole(user, "owner");

            const property = await models.Property.findByPk(id);

            if (!property) {

                throw new Error("Property not found");
                
            }

            if (property.ownerId !== user.id) {

                throw new Error("Not authorized to delete this property");

            }

            await property.destroy();

            return true;

        }

    },

    Property: {

        async owner(property, _, { models }) {

            return models.User.findByPk(property.ownerId);

        },

        async bookings(property, _, { models }) {

            return models.Booking.findAll({

                where: { propertyId: property.id },
                order: [["startDate", "ASC"]]

            });

        },

        async blockedDates(property, _, { models }) {

            return models.BlockedDate.findAll({

                where: { propertyId: property.id },
                order: [["startDate", "ASC"]]

            });

        }

    }

}

module.exports = propertyResolvers;
