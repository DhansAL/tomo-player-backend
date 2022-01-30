import { Types } from "mongoose";

export interface CollectionModel {
  username: Types.ObjectId;
  collectionDetails: [
    {
      name: string;
    }
  ];
}
