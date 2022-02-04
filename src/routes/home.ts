import * as express from "express";

export const homeRouter = express.Router();
homeRouter.get("/", (req, res) => {
  res.send("welcome to tomoplayer backend server deployed on heroku");
});
