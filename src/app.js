const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers");
const db = require("./models");

const app = express();

app.use(express.json());

function getUserFromToken(request) {

    const authHeader = request.headers.authorization || "";

    if (!authHeader.startsWith("Bearer ")) {

        return null;

    }

    const token = authHeader.replace("Bearer ", "").trim();

    if (!token) return null;

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return decoded;

    } catch (error) {

        console.warn("Invalid JWT:", error.message);
        return null;

    }

}

const server = new ApolloServer({

    typeDefs,
    resolvers,
    context: ({ req }) => {

        const user = getUserFromToken(req)

        return {
            
            user,
            models: db

        };

    }

});

server.applyMiddleware({ app, path: "/graphql" });

module.exports = app;
