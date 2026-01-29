import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import YAML from "yaml";
import cors from "cors";
import "dotenv/config";
import { HealthController } from "./controller/HealthController.js";
import { AuthController } from "./controller/AuthController.js";
import { PostController } from "./controller/PostController.js";
import { RecommendationController } from "./controller/RecommendationController.js";
const PORT = process.env.PORT || 3000;
const app = express();
app.use((req, _res, next) => {
    console.log("Incoming:", req.method, req.url);
    next();
});
//Load API Documentation
const openApiPath = "./openapi.yml";
const file = fs.readFileSync(openApiPath, "utf8");
const swaggerDocument = YAML.parse(file);
//Setup API Documentation Route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(express.json());
app.use(cors());
//Activate Controllers
HealthController.init(app);
AuthController.init(app);
PostController.init(app);
RecommendationController.init(app);
console.log(app.router?.stack
    ?.filter((r) => r.route)
    .map((r) => r.route.path));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map