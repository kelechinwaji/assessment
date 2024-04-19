import express, { Request, Response } from "express";
// import { Request, Response } from "express";
import bodyParser from "body-parser";
import connectDB from "./database/config";
import route from "./module/route/routes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("product api");
});
app.use(route);
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
