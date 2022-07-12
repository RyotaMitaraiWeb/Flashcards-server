import jsonwebtoken from 'jsonwebtoken';
const blacklist = new Set();
const jwt = jsonwebtoken;
function generateToken(user) {
    const payload = {
        username: user.username,
        _id: user._id,
    };
    const token = jwt.sign(payload, '12mgo203gokwasA2O', {
        expiresIn: '60 days',
    });
    return token;
}
function verifyToken(req, res, next) {
    try {
        console.log(req.cookies);
        const token = req.cookies.accessToken;
        if (blacklist.has(token)) {
            throw new Error();
        }
        const accessToken = jwt.verify(token, '12mgo203gokwasA2O');
        console.log(accessToken);
        req.accessToken = accessToken;
        next();
    }
    catch (err) {
        res.cookie('accessToken', '', {
            secure: false,
            httpOnly: true,
        });
        res.status(403).json({
            msg: 'Invalid token',
        });
        res.end();
    }
}
function blacklistToken(req, _res, next) {
    const token = req.cookies.accessToken;
    blacklist.add(token);
    next();
}
const jwtService = {
    generateToken,
    verifyToken,
    blacklistToken,
};
export default jwtService;
