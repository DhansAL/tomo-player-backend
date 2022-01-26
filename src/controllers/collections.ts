import { Request, Response } from "express";
import Collection from "../models/collections";
export const addCollection = (req: Request, res: Response) => {
  // middleware will turn this to req.user
  Collection.findOne({ username: req.body.tokenId._id }).exec(
    (error, collection) => {
      if (error) if (error) return res.status(400).json({ error });
      if (collection) {
        // this user has a collection
        let showNameInRequest = req.body.collectionDetails.name;
        /**find if we have a show that matches with this. if no push the req show in this arr */

        for (let i = 0; i < collection.collectionDetails.length; i++) {
          if (collection.collectionDetails[i].name == showNameInRequest) {
            return res.status(400).json({
              message: "this show already exists in your collection ",
            });
          }
        }

        //if the requested to add is a new show
        collection.collectionDetails.push(req.body.collectionDetails);

        Collection.findOneAndUpdate(
          { username: req.body.tokenId._id },
          {
            $set: {
              collectionDetails: collection.collectionDetails,
            },
          }
        ).exec((error, update) => {
          if (error) {
            return res.status(400).json({
              error: "had issues adding your new show!",
            });
          }

          if (update) {
            return res.status(201).json({
              message: "added  your new show!",
              newshow: req.body.collectionDetails,
            });
          }
        });

        // let user = Collection.findOneAndUpdate({
        //   username: req.body.tokenId._id,
        // } );
      } else {
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
