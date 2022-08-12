import jsonwebtoken from 'jsonwebtoken';
const blacklist = new Set();
const secret = process.env.SECRET || '12mgo203gokwasA2O';
const jwt = jsonwebtoken;
function generateToken(user) {
    const payload = {
        username: user.username,
        _id: user._id,
    };
    const token = jwt.sign(payload, secret, {
        expiresIn: '60 days',
    });
    return token;
}
function verifyToken(req, res, next) {
    try {
        const token = req.cookies.accessToken;
        if (blacklist.has(token)) {
            throw new Error();
        }
        const accessToken = jwt.verify(token, secret);
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
