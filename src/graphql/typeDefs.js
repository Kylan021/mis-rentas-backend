
const { gql } = require("apollo-server-express");

const typeDefs = gql `

    type User {
    
        id: ID!
        name: String!
        email: String!
        role: String!

    }

    type Property{

        id: ID!
        title: String!
        description: String
        maxGuests: Int!
        basePricePerNight: Float!
        owner: User!
        bookings: [Booking!]
        blockedDates: [BlockedDate!]

    }

    type Booking {
    
        id: ID!
        property: Property!
        user: User!
        startDate: String!
        endDate: String!
        status: String!
        totalPrice: Float!
        guests: Int!

    }

    type BlockedDate {
    
        id: ID!
        property: Property!
        startDate: String!
        endDate: String!
        reason: String

    }

    type AuthPayload {
    
        token: String!
        user: User!

    }

    type Query {
    
        account: User

        myProperties: [Property!]!

        property(id: ID!): Property

        searchAvailableProperties(
        
            start: String!
            end: String!
            guests: Int!

        ): [Property!]!

    }

    type Mutation {
    
        register(
        
            name: String!
            email: String!
            password: String!
            role: String!

        ): User!

        login(
        
            email: String!
            password: String!

        ): AuthPayload!

        createProperty(
        
            title: String!
            description: String
            maxGuests: Int!
            basePricePerNight: Float!
        
        ): Property!

        updateProperty(
        
            id: ID!
            title: String
            description: String
            maxGuests: Int
            basePricePerNight: Float
        
        ): Property!

        deleteProperty(id: ID!): Boolean!

        createBlockedDate(
        
            propertyId: ID!
            start: String!
            end: String!
            reason: String

        ): BlockedDate!

        createBooking(
        
            propertyId: ID!
            start: String!
            end: String!
            guests: Int!

        ): Booking!

    }

`;

module.exports = typeDefs;
