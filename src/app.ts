// index.ts
import express from "express";
import bodyParser from "body-parser";
import connectDB from "./database/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit process with failure
  }
};

startServer();