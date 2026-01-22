import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import YAML from "yaml";
import cors from "cors";
const PORT = process.env.PORT || 3000;
const app = express();
//Load API Documentation
const openApiPath = "./openapi.yml";
const file = fs.readFileSync(openApiPath, "utf8");
const swaggerDocument = YAML.parse(file);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.get("/", (req, res) => {
    res.send({ "message": "Hello Express from TS" });
});
app.get("/hi", (req, res) => {
    res.send("Zeawas");
});
app.listen(PORT, () => {
    console.log(`Express server started on port ${PORT}`);
});
//# sourceMappingURL=index.js.map