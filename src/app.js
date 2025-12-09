const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers");
const db = require("./models");
const { getUserFromRequest } = require("./middleware/auth");

const app = express();

const server = new ApolloServer({

    typeDefs,
    resolvers,
    context: async ({ req }) => {

        const user = await getUserFromRequest(req);

        return {
            
            user,
            models: db

        };

    }

});

server.applyMiddleware({ app, path: "/graphql" });

module.exports = app;
