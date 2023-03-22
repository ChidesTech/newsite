const express = require("express");
const { isValidObjectId } = require("mongoose");
const Review = require("../models/reviewModel");

const reviewRouter = express.Router();

reviewRouter.post("/", async (req, res) => {
    const newReview = new Review(req.body);
    const review = await newReview.save();
    if (review) {
        res.send({ success: "Review Added Successfully" })
    } else {
        res.send({ error: "Error adding review" })
    }
});



reviewRouter.get("/:productId", async (req, res) => {
    const productId = req.params.productId;
    if(!isValidObjectId(productId)){
        res.send({error : "The ID of the product is invalid"});
        return;
       }
  const reviews = await Review.find({product : req.params.productId}).populate("user");
  
  
  res.send(reviews);
  

})








module.exports = reviewRouter;

