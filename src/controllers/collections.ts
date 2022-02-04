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
        let collNames: string[] = [];

        for (let i = 0; i < collection.collectionDetails.length; i++) {
          collNames.push(collection.collectionDetails[i].name);
        }
        for (let i = 0; i < req.body.collectionDetails.length; i++) {
          let reqShow = req.body.collectionDetails[i];
          if (collNames.includes(reqShow.name)) {
            thisExisitsArr.push(reqShow.name);
          } else {
            //new show
            thisNewArr.push(reqShow.name);
            collection.collectionDetails.push(reqShow);
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
            return res.status(201).json({
              greet:
                "welcome new user, congrats on your first sync. added your show(s) successfully to our database",
            });
          }
        });
      }
    }
  );
};

export const getCollections = (req: Request, res: Response) => {
  Collection.findOne({ username: req.body.tokenId._id }).exec(
    (error, details) => {
      if (error) return res.status(400).json({ error });

      if (details) {
        return res.status(201).json({ yourShows: details.collectionDetails });
      } else {
        return res.status(400).json({ error: "no shows added yet" });
      }
    }
  );
};
export const deleteCollection = (req: Request, res: Response) => {
  Collection.findOneAndDelete({ username: req.body.tokenId._id }).exec(
    (error, deletedUser) => {
      if (error) return res.status(400).json({ error });

      if (deletedUser) {
        return res.status(201).json({
          msg: "deleted user collection successfully!",
          user: deletedUser,
        });
      } else {
        return res.status(400).json({
          error: "user does not have any collection online yet",
        });
      }
    }
  );
};
