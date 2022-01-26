import mongoose from "mongoose";
import { CollectionModel } from "../interfaces/models/collections";

const collectionSchema = new mongoose.Schema<CollectionModel>(
  {
    //BARE BASIC COLLECTION SCHEMA
    // collection is reserved in mongodb
    username: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    collectionName: [
      {
        name: {
          type: String,
          required: true,
        },
        rounds: [
          {
            //lets store proper dates strings
            started: { type: String, required: true },
            ended: { type: String, required: true },
            round: { type: Number, required: true },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Collection", collectionSchema);
