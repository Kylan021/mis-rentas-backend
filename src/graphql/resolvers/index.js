
const authResolvers = require("./auth");
const propertyResolvers = require("./property");
const blockedDateResolvers = require("./blockedDate");

const resolvers = {

    Query: {

        ...authResolvers.Query,
        ...propertyResolvers.Query

    },

    Mutation: {

        ...authResolvers.Mutation,
        ...propertyResolvers.Mutation,
        ...blockedDateResolvers.Mutation

    },

    Property: {

        ...propertyResolvers.Property

    },

    BlockedDate: {

        ...blockedDateResolvers.BlockedDate

    }

};

module.exports = resolvers;
