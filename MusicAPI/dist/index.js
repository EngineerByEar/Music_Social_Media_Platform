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
import { UserController } from "./controller/UserController.js";
import { InteractionController } from "./controller/InteractionController.js";
import { UserActionController } from "./controller/UserActionController.js";
import { PageController } from "./controller/PageController.js";
import * as http from "node:http";
import { WebSocketController } from "./controller/WebSocketController.js";
const PORT = process.env.PORT || 3000;
const app = express();
//Load API Documentation
const openApiPath = "./openapi.yml";
const file = fs.readFileSync(openApiPath, "utf8");
const swaggerDocument = YAML.parse(file);
//Setup API Documentation Route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/changelog", express.static(path.join(process.cwd(), "changelog.txt")));
app.use(express.json());
app.use(cors());
//Activate Controllers
HealthController.init(app);
AuthController.init(app);
PostController.init(app);
RecommendationController.init(app);
UserController.init(app);
InteractionController.init(app);
UserActionController.init(app);
PageController.init(app);
const server = http.createServer(app);
WebSocketController.initWebSocket(server);
server.listen(10974, () => {
    console.log(`WebSocket server listening on 10974`);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map