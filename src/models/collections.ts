import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    //BARE BASIC COLLECTION SCHEMA
    // collection is reserved in mongodb
    collectionName: [
      {
        collectionName: {
          type: String,
          required: true,
        },
        username: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
          trim: true,
          min: 3,
          max: 15,
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

module.exports = mongoose.model("Collection", collectionSchema);
