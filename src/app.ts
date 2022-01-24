import express, { Application, Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { connect } from "mongoose";

const app: Application = express();

dotenv.config({ path: "./config.env" });
const PORT: string | undefined = process.env.PORT;

// Body parsing Middleware
app.use(express.json());

//cors
const allowedOrigins = [`http://localhost:${PORT}`];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));

//routes

(async function dbConnect(): Promise<void> {
  // 4. Connect to MongoDB
  await connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.qkirs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
    .then(() => {
      console.log("connection ok  ^_^");
    })
    .catch((err) => console.log("connection error - " + err));
  try {
    app.listen(PORT, (): void => {
      console.log(`LISTENING ON ${PORT}`);
    });
  } catch (error: any) {
    console.error(`Error occured: ${error.message}`);
  }
})();
