import express from "express";
import auth from "./auth";

const app = express();

app.use("/api/v1/user", auth);

export default app;
