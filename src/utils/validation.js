function requireAuth(user) {

    if (!user) {

        throw new Error("Not authenticated");

    }

    return user;
    
}

function requireRole(user, role) {

    requireAuth(user);

    if (user.role !== role) {

        throw new Error(`Not authorized. Required role: ${role}`);
        

    }

    return user;
    
}

module.exports = {

    requireAuth,
    requireRole

}
