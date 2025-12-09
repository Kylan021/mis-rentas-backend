
const authResolvers = require("./auth");
const propertyResolvers = require("./property");

const resolvers = {

    Query: {

        ...authResolvers.Query,
        ...propertyResolvers.Query

    },

    Mutation: {

        ...authResolvers.Mutation,
        ...propertyResolvers.Mutation

    },

    Property: {

        ...propertyResolvers.Property

    }

};

module.exports = resolvers;
