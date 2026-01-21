import express from "express";
import cors from "cors";
const PORT = process.env.PORT || 3000;
const app = express();
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