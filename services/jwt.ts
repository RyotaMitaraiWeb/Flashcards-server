import * as jwt from 'jsonwebtoken';

function generateToken(user: any): string {
    const payload: {} = {
        username: user.username,
        _id: user._id,
    };

    const token: string = jwt.sign(payload, process.env.JWT as string, {
        expiresIn: '15m',
    });
    return token;
}

const jwtService = {
    generateToken,
};

export default jwtService;