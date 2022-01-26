import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserModel } from "../interfaces/models/user";

const userSchema = new mongoose.Schema<UserModel>(
  //does mongoose even understands interfaces? lol
  {
    username: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 15,
    },
    hash_password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods = {
  authenticate: async function (password: string) {
    return await bcrypt.compare(password, this.hash_password);
  },
};
export default mongoose.model("User", userSchema);
