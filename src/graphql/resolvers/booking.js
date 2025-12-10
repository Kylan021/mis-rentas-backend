
const { Op } = require('sequelize');
const { requireRole } = require('../../utils/validation');

const bookingResolvers = {

  Mutation: {

    async createBooking(_, { propertyId, start, end, guests }, { user, models }) {

      requireRole(user, 'traveler');

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

      const startStr = start;
      const endStr   = end;

      const property = await models.Property.findByPk(propertyId);

      if (!property) {

        throw new Error('Property not found');

      }

      if (guests > property.maxGuests) {

        throw new Error(`Guests exceed max capacity (${property.maxGuests})`);

      }

      const overlappingConfirmedBookings = await models.Booking.count({

        where: {

          propertyId: property.id,
          status: 'CONFIRMED',
          [Op.and]: [

            { startDate: { [Op.lte]: endStr } },
            { endDate:   { [Op.gte]: startStr } },

          ],

        },

      });

      if (overlappingConfirmedBookings > 0) {

        throw new Error('Cannot create booking: dates overlap with confirmed bookings');

      }

      const overlappingBlockedDates = await models.BlockedDate.count({

        where: {

          propertyId: property.id,
          [Op.and]: [

            { startDate: { [Op.lte]: endStr } },
            { endDate:   { [Op.gte]: startStr } }

          ]

        }

      });

      if (overlappingBlockedDates > 0) {

        throw new Error('Cannot create booking: dates overlap with blocked dates');

      }

      const msPerDay = 1000 * 60 * 60 * 24;
      const diffMs = endDate.getTime() - startDate.getTime();
      const nights = diffMs / msPerDay;

      if (nights <= 0) {

        throw new Error('Booking must be at least 1 night');

      }

      const totalPrice = Number(property.basePricePerNight) * nights;

      const booking = await models.Booking.create({

        propertyId: property.id,
        travelerId: user.id,
        startDate: startStr,
        endDate: endStr,
        guests,
        status: 'PENDING',
        totalPrice

      });

      return booking;

    }

  },

  Booking: {

    async property(booking, _, { models }) {

      return models.Property.findByPk(booking.propertyId);

    },

    async user(booking, _, { models }) {

      return models.User.findByPk(booking.travelerId);

    }
    
  }

};

module.exports = bookingResolvers;
