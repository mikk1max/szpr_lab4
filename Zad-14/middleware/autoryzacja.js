function isAuthorized(req, res, next) {
    const expectedPassword = "secretpaswd";
    const providedPassword = req.body.password;

    if (providedPassword === expectedPassword) {
        next();
    } else {
        res.status(401).send("Dostęp zabroniony");
    }
}

module.exports = isAuthorized;
