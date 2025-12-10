
const authResolvers = require("./auth");
const propertyResolvers = require("./property");
const blockedDateResolvers = require("./blockedDate");
const bookingResolvers = require("./booking");

const resolvers = {

    Query: {

        ...authResolvers.Query,
        ...propertyResolvers.Query

    },

    Mutation: {

        ...authResolvers.Mutation,
        ...propertyResolvers.Mutation,
        ...blockedDateResolvers.Mutation,
        ...bookingResolvers.Mutation

    },

    Property: {

        ...propertyResolvers.Property

    },

    BlockedDate: {

        ...blockedDateResolvers.BlockedDate

    },

    Booking: {

        ...bookingResolvers.Booking,

    }

};

module.exports = resolvers;
