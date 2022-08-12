import User from '../models/User.js';
import bcrypt from 'bcrypt';
import userService from './user.js';

async function register(username: string, password: string, email: string): Promise<IUser> {
    const user: any = new User({
        username,
        password,
        email,
    });

    await user.save();

    return user;
}

async function login(username: string, password: string): Promise<IUser> {
    const user: IUser = <IUser>await userService.findUserByUsername(username);
    if (!user) {
        throw new Error('Грешно потребителско име или парола');
    }

    const comparison: boolean = await bcrypt.compare(password, user.password);
    if (!comparison) {
        throw new Error('Грешно потребителско име или парола');
    }

    return user;
}

const authService = {
    register,
    login,
}

export default authService;