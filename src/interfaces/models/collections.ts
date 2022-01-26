import { Types } from "mongoose";

export interface CollectionModel {
  username: Types.ObjectId;
  collectionDetails: [
    {
      name: string;
      rounds: [
        {
          //lets store proper dates strings
          started: string;
          ended: string;
          round: string;
        }
      ];
    }
  ];
}
