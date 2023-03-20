const express = require("express"); //
const mongoose = require("mongoose"); //use to connect the backend to the database
const cors = require("cors"); //cross origin resource sharing (use for interaction btw frontend and backend)
const User = require("./models/userModel");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const orderRouter = require("./routes/orderRoutes");




const app = express(); //initilazing the node-express app

app.use(cors()); //allows for interacting with the backend and frontend
app.use(express.json()); //allows for the information from thr frontend to be extracted to the backend

// get,post,put,delete

app.get("/" , (request, response) =>{
  response.send ("This is the new node server");
});


// Routes Connection
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);



// create a database connection
mongoose.connect("mongodb+srv://mernclass:mernclasspassword@cluster0.2raujid.mongodb.net/?retryWrites=true&w=majority")
.then(res => console.log("mongoDB connected"))
.catch (err => console.log(err));

// create a lister to run the server
app.listen(5000, ()=>{
console.log("listening on port 5000")
});


