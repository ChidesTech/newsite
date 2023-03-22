const mongoose = require("mongoose");
const user = require("./userModel");



const productSchema = new mongoose.Schema({
  title : {type : String},
  price : {type : Number},
  numInStock : {type : Number},
  image : {type : String},
  images : {type : Array},
  description : {type : String},
    
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;