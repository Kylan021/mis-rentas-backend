
require('dotenv').config();

const app = require("./app");
const db = require("./models");

const PORT = process.env.PORT || 4000;

async function startServer() {

    try {

        await db.sequelize.authenticate();
        console.log("Database connection established successfully.");

        await db.sequelize.sync();
        console.log("Models synchronized successfully.");

        app.listen(PORT, () => {

            console.log(`Server running on http://localhost:${PORT}`);
            console.log(`GraphQL endpoint ready at http://localhost:${PORT}/graphql`);

        });

    } catch (error) {

        console.error("Unable to start server:", error);
        process.exit(1);

    }
}

startServer();
