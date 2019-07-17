const Auth = (req, res, next) => {
    if (req.originalUrl == '/auth/sing-in') return next();

    try {
        const user = JSON.parse(req.cookies.currentUser);
        console.log("AUTH >>>> ");
        if (!user) return res.redirect('/auth/sing-in');

    } catch (e) {}

    next();
}

module.exports = Auth;