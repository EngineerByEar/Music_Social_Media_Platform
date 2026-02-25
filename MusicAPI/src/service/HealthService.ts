import{DB} from "../db.js";

export class HealthService{
    static async check_health(): Promise<boolean>{
        try{
            await DB.query("select 1");
            return true;
        }catch(e){
            return false;
        }
    }
}