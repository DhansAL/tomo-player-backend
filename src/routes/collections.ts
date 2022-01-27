import * as express from "express";
import { requireSignin } from "../common-middleware";
import { addCollection, getCollections } from "../controllers/collections";

export const collectionRouter = express.Router();
collectionRouter.post(
  "/collections/addCollection",
  requireSignin,
  addCollection
);
collectionRouter.get(
  "/collections/getCollections",
  requireSignin,
  getCollections
);
