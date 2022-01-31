import * as express from "express";
import { requireSignin } from "../common-middleware";
import { addCollection, getCollections } from "../controllers/collections";

export const collectionRouter = express.Router();
collectionRouter.post(
  "/collections/addcollection",
  requireSignin,
  addCollection
);
collectionRouter.get(
  "/collections/getcollection",
  //TODO: validate req.body
  requireSignin,
  getCollections
);
