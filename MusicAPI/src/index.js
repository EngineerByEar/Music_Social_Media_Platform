import express from "express";
const PORT = process.env.PORT || 3000;
const app = express();
app.get("/", (req, res) => {
    res.send("Hello Express from TS");
});
app.get("/hi", (req, res) => {
    res.send("Zeawas");
});
app.listen(PORT, () => {
    console.log(`Express server started on port ${PORT}`);
});
//# sourceMappingURL=index.js.map