import {Express, Request, Response} from "express";
import {HealthService} from "../service/HealthService.js";

export class HealthController {
    static init(app:Express){
        app.get('/health', HealthController.check_health);
    }

    static async check_health(req:Request, res:Response){
        const db_connection = await HealthService.check_health();
        if (db_connection){
            res.status(200).json({
                status: "OK",
                message: "Database Connected"
            })
            return;
        }else{
            res.status(404).json({
                status: "Not Found",
                message: "Database Not Found"
            })
        }


    }

}