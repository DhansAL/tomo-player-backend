import { Request, Response } from "express";
import Collection from "../models/collections";
export const addCollection = (req: Request, res: Response) => {
  // middleware will turn this to req.user
  console.log(req.body.userid, "yahaloo ;-;");

  //   Collection.findOne({ username: req.body._id }).exec((error, collection) => {
  //     if (error) if (error) return res.status(400).json({ error });

  //     if (collection) {
  //       console.log("ill be updating your collection");
  //     } else {
  //       console.log("ill be creating collection");
  //     }
  //   });
};
