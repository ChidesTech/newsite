const express = require("express");
const { isValidObjectId } = require("mongoose");
const Order = require("../models/orderModel");


const orderRouter = express.Router();


orderRouter.post("/", async(req, res) => {
   let orderItems = req.body.orderItems;
   let totalPrice = orderItems.reduce((a,c) => a + c.price * c.qty, 0);

   const newOrder = new Order({
      user : req.body.user, 
      orderItems : req.body.orderItems,
      deliveryInfo : req.body.deliveryInfo,
      totalPrice : totalPrice
   });

   const order = await newOrder.save();
   if(order){
      res.send({success : "Order Made Successfully"});
   }else{
      res.send({error : "Error Saving Order"});
   }
});
orderRouter.get("/", async(req, res)=>{
   const orders = await Order.find().populate("user");
   console.log(orders)
   res.send(orders);
});

orderRouter.put("/:id", async(req, res) => {
    const id = req.params.id;
    if(!isValidObjectId(id)){
        res.send({error : "The ID of the order is invalid"});
        return;
       }
    //Get the order you wish to update
    const order = await Order.findById(id);
    //Check if the order exists
    if(!order){
        res.send({error : "The order was not found"});
        return;
    }
    //Update the order information
    order.status = req.body.status || order.status;
   
    //Save new order information
    const updatedOrder = await order.save();
    if(updatedOrder){
        res.send({success : "Order updated successfully"})
    }else{
        res.send({error : "Error updating order"})
    }

});

orderRouter.get("/order-history/:id", async(req, res) => {
   const id = req.params.id;
   const orders = await Order.find({user : id}).populate("user");
   console.log(orders)
   res.send(orders);
})





module.exports = orderRouter;