import { DB } from "../db.js";
export class HealthService {
    static async check_health() {
        try {
            await DB.query("select 1");
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
//# sourceMappingURL=HealthService.js.map