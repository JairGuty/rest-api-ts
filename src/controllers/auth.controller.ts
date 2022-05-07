import { Request, Response } from "express";

import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";



export const signup = async (req: Request, res: Response) => {
    // Saveing the user in the database
    const user: IUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    user.password = await user.encryptPassword(user.password);
    const savedUser = await user.save();
    // token
    const token: string = jwt.sign({ id: savedUser._id }, process.env.TOKEN_SECRET || 'token_secret');

    res.header('auth-token', token).json(savedUser);
};

export const signin = async (req: Request, res: Response) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: 'Email or password invalid' });

    const correctPassword: boolean = await user.validatePassword(req.body.password);
    if (!correctPassword) return res.status(400).json({ message: 'Password or email invalid' });
    const token = await jwt.sign({ id: user._id }, process.env.TOKEN_SECRET || 'token_secret', { expiresIn: 60 * 60 * 24 });

    res.header('auth-token', token).json(user);
};

export const profile = async (req: Request, res: Response) => {

    const user = await User.findById(req.userId, {password: 0});

    if (!user) {
        return res.status(404).json('No User found');
    }
    res.status(200).json(user);
};

export const testing = (req: Request, res: Response) => {
    res.json('Private route');
}