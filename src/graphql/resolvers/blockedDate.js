const { Op } = require('sequelize');
const { requireRole } = require('../../utils/validation');

const blockedDateResolvers = {

  Mutation: {

    async createBlockedDate(_, { propertyId, start, end, reason }, { user, models }) {

      requireRole(user, 'owner');

      const startDate = new Date(start);
      const endDate = new Date(end);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {

        throw new Error('Invalid date format. Use YYYY-MM-DD');

      }

      if (startDate >= endDate) {

        throw new Error('Start date must be before end date');

      }

      const property = await models.Property.findByPk(propertyId);

      if (!property) {

        throw new Error('Property not found');

      }

      if (property.ownerId !== user.id) {

        throw new Error('Not authorized to block dates for this property');

      }

      const startStr = start;
      const endStr = end;

      const overlappingConfirmedBookings = await models.Booking.count({

        where: {
            
          propertyId: property.id,
          status: 'CONFIRMED',
          [Op.and]: [

            { startDate: { [Op.lte]: endStr } },
            { endDate:   { [Op.gte]: startStr } }

          ],

        },

      });

      if (overlappingConfirmedBookings > 0) {

        throw new Error('Cannot block dates that overlap with confirmed bookings');

      }

      const blockedDate = await models.BlockedDate.create({

        propertyId: property.id,
        startDate: startStr,
        endDate: endStr,
        reason

      });

      return blockedDate;

    },

  },

  BlockedDate: {

    async property(blockedDate, _, { models }) {

      return models.Property.findByPk(blockedDate.propertyId);

    },

  },

};

module.exports = blockedDateResolvers;
