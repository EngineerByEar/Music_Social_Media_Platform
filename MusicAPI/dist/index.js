import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import YAML from "yaml";
import cors from "cors";
import "dotenv/config";
import { HealthController } from "./controller/HealthController.js";
import { UserController } from "./controller/UserConroller.js";
const PORT = process.env.PORT || 3000;
const app = express();
//Load API Documentation
const openApiPath = "./openapi.yml";
const file = fs.readFileSync(openApiPath, "utf8");
const swaggerDocument = YAML.parse(file);
//Setup API Documentation Route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(cors());
//Activate Controllers
HealthController.init(app);
UserController.init(app);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map