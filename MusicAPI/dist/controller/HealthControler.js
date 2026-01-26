import { HealthService } from "../service/HealthService";
export class HealthControler {
    static init(app) {
        app.get('/health', HealthControler.check_health);
    }
    static async check_health(req, res) {
        const db_connection = await HealthService.check_health();
        if (db_connection) {
            res.status(200).json({
                status: "OK",
                message: "Database Connected"
            });
        }
        else {
            res.status(404).json({
                status: "Not Found",
                message: "Database Not Found"
            });
        }
    }
}
//# sourceMappingURL=HealthControler.js.map