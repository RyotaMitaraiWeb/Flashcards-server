import User from '../models/User';
import jwtService from './jwt';

async function register(username: string, password: string, email: string): Promise<string> {
    const user = new User({
        username,
        password,
        email,
    });

    const token: string = jwtService.generateToken(user);
    await user.save();

    return token;
}

const authService = {
    register,
}

export default authService;