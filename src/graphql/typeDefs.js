
const { gql } = require("apollo-server-express");
const { Model } = require("sequelize");

const typeDefs = gql `

    type Query {
    
        hello: String!

    }

    type Mutation {
    
        _empty: String

    }

`;

module.exports = typeDefs;
