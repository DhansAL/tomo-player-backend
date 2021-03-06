import express, { Application } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { connect } from "mongoose";
import { authRouter } from "./routes/auth";
import { collectionRouter } from "./routes/collections";
import { homeRouter } from "./routes/home";

/**
 * FIXME: need to compile ts before deploying to generate .js mainfile
 * make a script which takes care of this
 */
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
app.use("/api", authRouter);
app.use("/api", collectionRouter);
app.use("/api", homeRouter);

dbConnect();
//  Connect to MongoDB
async function dbConnect(): Promise<void> {
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
}
