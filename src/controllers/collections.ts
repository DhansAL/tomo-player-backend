import { Request, Response } from "express";
import Collection from "../models/collections";
export const addCollection = (req: Request, res: Response) => {
  // middleware will turn this to req.user
  Collection.findOne({ username: req.body.tokenId._id }).exec(
    (error, collection) => {
      if (error) if (error) return res.status(400).json({ error });
      if (collection) {
        console.log("ill be updating your collection");
      } else {
        console.log("ill be creating collection");
        const collection = new Collection({
          username: req.body.tokenId._id,
          collectionDetails: req.body.collectionDetails,
        });
        collection.save((error, collection) => {
          if (error) return res.status(400).json({ error });
          if (collection) {
            return res.status(201).json({ collection });
          }
        });
        console.log(req.body.tokenId._id);
      }
    }
  );
};
