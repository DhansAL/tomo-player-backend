import * as express from "express";
import { isRequestValidated, validateSignupRequests } from "../validators/auth";

const router = express.Router();

router.post("/signup", validateSignupRequests, isRequestValidated);
