import express from "express";
import auth from "./auth";
import product from "./product";

const app = express();

app.use("/api/v1/user", auth);
app.use("/api/v1/product", product);

export default app;
