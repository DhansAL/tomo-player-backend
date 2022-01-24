import express, { Application, Request, Response } from "express";
import cors from "cors";

import * as dotenv from "dotenv";
import { connect } from "mongoose";

const app: Application = express();

dotenv.config({ path: "./config.env" });

// Body parsing Middleware
app.use(express.json());

//cors
const allowedOrigins = [`http://localhost:${process.env.PORT}`];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: "Hello!",
  });
});

//connection via mongoose

(async function run(): Promise<void> {
  // 4. Connect to MongoDB
  await connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.qkirs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
    .then(() => {
      console.log("connection ok  ^_^");
    })
    .catch((err) => console.log("connection error - " + err));
  try {
    app.listen(process.env.PORT, (): void => {
      console.log(`Connected successfully on  ${process.env.PORT}`);
    });
  } catch (error: any) {
    console.error(`Error occured: ${error.message}`);
  }
})();
