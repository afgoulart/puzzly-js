const Auth = (req, res, next) => {
    console.log(req)
    next()
}

module.exports = Auth;