import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";
import "dotenv/config";

export interface ITokenPayload{
    username: string;
}

export function generateToken(payload:ITokenPayload){
    return jwt.sign(payload, process.env.JWT_SECRET as string);
}

export function validateAuth(req:Request, res: Response, next: NextFunction){
    try{
        const header = (req.headers.authorization ?? '').trim();

        if(!header.startsWith("Bearer")){
            res.status(401).json({
                "message": "No token provided",
                "code": "NO TOKEN"
            });
            return;
        }

        const token = header.substring('Bearer '.length);
        const decode = jwt.verify(token, process.env.JWT_SECRET!) as ITokenPayload;
        req.params._username = decode.username;
        next()
    }catch(e){
        res.status(401).send();
    }
}