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

        }

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
