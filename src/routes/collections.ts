import * as express from "express";
import { addCollection } from "../controllers/collections";

export const collectionRouter = express.Router();
collectionRouter.post("/collections/addCollection", addCollection);
