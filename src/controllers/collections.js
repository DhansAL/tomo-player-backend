"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCollection = exports.getCollections = exports.addCollection = void 0;
const collections_1 = __importDefault(require("../models/collections"));
const addCollection = (req, res) => {
    // middleware will turn this to req.user
    collections_1.default.findOne({ username: req.body.tokenId._id }).exec((error, collection) => {
        if (error)
            if (error)
                return res.status(400).json({ error });
        if (collection) {
            // this user has a collection
            let thisExisitsArr = [];
            let thisNewArr = [];
            let collNames = [];
            for (let i = 0; i < collection.collectionDetails.length; i++) {
                collNames.push(collection.collectionDetails[i].name);
            }
            for (let i = 0; i < req.body.collectionDetails.length; i++) {
                let reqShow = req.body.collectionDetails[i];
                if (collNames.includes(reqShow.name)) {
                    thisExisitsArr.push(reqShow.name);
                }
                else {
                    //new show
                    thisNewArr.push(reqShow.name);
                    collection.collectionDetails.push(reqShow);
                }
            }
            //update to mongodb
            collections_1.default.findOneAndUpdate({ username: req.body.tokenId._id }, {
                $set: {
                    collectionDetails: collection.collectionDetails,
                },
            }).exec((error, update) => {
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
        }
        else {
            const collection = new collections_1.default({
                username: req.body.tokenId._id,
                collectionDetails: req.body.collectionDetails,
            });
            collection.save((error, collection) => {
                if (error)
                    return res.status(400).json({ error });
                if (collection) {
                    return res.status(201).json({
                        greet: "welcome new user, congrats on your first sync. added your show(s) successfully to our database",
                    });
                }
            });
        }
    });
};
exports.addCollection = addCollection;
const getCollections = (req, res) => {
    collections_1.default.findOne({ username: req.body.tokenId._id }).exec((error, details) => {
        if (error)
            return res.status(400).json({ error });
        if (details) {
            return res.status(201).json({ yourShows: details.collectionDetails });
        }
        else {
            return res.status(400).json({ error: "no shows added yet" });
        }
    });
};
exports.getCollections = getCollections;
const deleteCollection = (req, res) => {
    collections_1.default.findOneAndDelete({ username: req.body.tokenId._id }).exec((error, deletedUser) => {
        if (error)
            return res.status(400).json({ error });
        if (deletedUser) {
            return res.status(201).json({
                msg: "deleted user collection successfully!",
                user: deletedUser,
            });
        }
        else {
            return res.status(400).json({
                error: "user does not have any collection online yet",
            });
        }
    });
};
exports.deleteCollection = deleteCollection;
