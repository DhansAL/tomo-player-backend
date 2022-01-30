import { Request, Response } from "express";
import Collection from "../models/collections";
export const addCollection = (req: Request, res: Response) => {
  // middleware will turn this to req.user
  Collection.findOne({ username: req.body.tokenId._id }).exec(
    (error, collection) => {
      if (error) if (error) return res.status(400).json({ error });
      if (collection) {
        // this user has a collection
        let thisExisitsArr: string[] = [];
        let thisNewArr: string[] = [];
        for (let i = 0; i < req.body.collectionDetails.length; i++) {
          let reqShow = req.body.collectionDetails[i];

          for (let j = 0; j < collection.collectionDetails.length; j++) {
            if (reqShow.name == collection.collectionDetails[j].name) {
              thisExisitsArr.push(reqShow.name);
              break;
            } else {
              console.log(reqShow.name, collection.collectionDetails);

              thisNewArr.push(reqShow.name);
              collection.collectionDetails.push(reqShow);
              break;
            }
          }
        }

        //update to mongodb
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
              error: "had issues adding your new shows!",
            });
          }

          if (update) {
            return res.status(201).json({
              error: "these items exists in your collection",
              exists: thisExisitsArr,
              msg: "these are successfully added to online collection",
              new: thisNewArr,
            });
          }
        });

        // new collection - user is new
      } else {
        const collection = new Collection({
          username: req.body.tokenId._id,
          collectionDetails: req.body.collectionDetails,
        });
        collection.save((error, collection) => {
          if (error) return res.status(400).json({ error });
          if (collection) {
            return res.status(201).json({ meg: "added new user" });
          }
        });
        console.log(req.body.tokenId._id);
      }
    }
  );
};

export const getCollections = (req: Request, res: Response) => {
  Collection.findOne({ username: req.body.tokenId._id }).exec(
    (error, details) => {
      if (error) if (error) return res.status(400).json({ error });

      if (details) {
        return res.status(201).json({ yourShows: details.collectionDetails });
      }
    }
  );
};
