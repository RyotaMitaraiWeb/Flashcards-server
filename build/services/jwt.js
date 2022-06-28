import * as jwt from 'jsonwebtoken';
function generateToken(user) {
    const payload = {
        username: user.username,
        _id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT, {
        expiresIn: '15m',
    });
    return token;
}
const jwtService = {
    generateToken,
};
export default jwtService;
