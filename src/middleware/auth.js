const jwt = require("jsonwebtoken");
const db = require("../models");

async function  getUserFromRequest(request) {

    const authHeader = request.headers.authorization || "";
    if (!authHeader.startsWith("Bearer ")) {

        return null;

    }

    const token = authHeader.replace("Bearer ", "").trim();
    if (!token) return null;

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await db.User.findByPk(decoded.id);

        if (!user) {

            return null;

        }

        return user;

    } catch (error) {

        console.warn("Invalid JWT:", error.message);
        return null;

    }
    
}

module.exports = {

    getUserFromRequest

}
