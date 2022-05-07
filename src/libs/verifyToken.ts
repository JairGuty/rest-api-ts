import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided.');

    // Get the payload from the token
    const payload = jwt.verify(token, process.env.TOKEN_SECRET ||'token_secret') as IPayload;

    // Se creo un Namespace llamada Express
   req.userId = payload._id;

    next();
};