const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ALLOWED_ROLES = ['owner', 'traveler'];

const authResolvers = {

    Query: {

        async account(_, __, { user }) {

            return user || null;

        }

    },

    Mutation: {

        async register(_, { name, email, password, role }, { models }) {

            const normalizedEmail = email.toLowerCase().trim();

            if (!ALLOWED_ROLES.includes(role)) {

                throw new Error("Invalid role. Allowed roles: owner, traveler");

            }

            const existing = await models.User.findOne({

                where: { email: normalizedEmail }

            });

            if (existing) {

                throw new Error("Email is already registered");

            }

            const passwordHash = await bcrypt.hash(password, 10);

            const user = await models.User.create({

                name,
                email: normalizedEmail,
                passwordHash,
                role

            });

            return user;

        },

        async login(_, { email, password }, { models }) {

            const normalizedEmail = email.toLowerCase().trim();

            const user = await models.User.findOne({

                where: { email: normalizedEmail }

            });

            if (!user) {

                throw new Error("Invalid credentials");

            }

            const isValid = await bcrypt.compare(password, user.passwordHash);

            if (!isValid) {

                throw new Error("Invalid credentials");

            }

            const payload = {

                id: user.id,
                email: user.email,
                role: user.role

            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {

                expiresIn: "7d"

            });

            return {

                token,
                user

            };

        },

    },

};

module.exports = authResolvers;