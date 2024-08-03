//router specific middleware
const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    // project fair-part 11 - 1hr 5mins
    console.log('inside jwt middleware');
    //  console.log(req.headers['authorization'].split(" ")[1]);
    const token = req.headers['authorization'].split(" ")[1]
    console.log(token);

    try {
        const jwtResponse = jwt.verify(token, 'supersecretkey')
        console.log(jwtResponse);
        req.payload = jwtResponse.adminId
        next()

    } catch (error) {
        res.status(401).json(`Authorization failed due to ${error}`)
    }

  
}

module.exports = jwtMiddleware