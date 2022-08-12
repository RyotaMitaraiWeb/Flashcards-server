import User from "../models/User.js";

async function findUserByUsername(username: string): Promise<IUser> {
    const user: IUser = <IUser>await User.findOne({ username });
    return user;
}

async function findUserByEmail(email: string): Promise<IUser> {
    const user: IUser = <IUser>await User.findOne({ email });
    return user;
}

async function findUserById(id: string): Promise<IUser> {
    const user: IUser = <IUser>await User.findById(id);
    return user;
}

const userService = {
    findUserByEmail,
    findUserById,
    findUserByUsername,
};

export default userService;