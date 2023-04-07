const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    //Check and return if the email already exist, 
    const existingEmail = await User.findOne({ email: req.body.email }) //e.g {email : "softyprimei@gmail.com"}
    //
    if (existingEmail) {
        res.send({ error: "This email is already in use" });
        return;
    }
    //Create a user
    const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    //Save the user
    const user = await newUser.save();
    if (user) {
        res.send({ success: "User saved successfully" })
    } else {
        res.send({ error: "Error saving New User" })
    }
})

userRouter.post("/login", async (req, res) => {
    //check if the email exists and eturn if it does not
    const existingUser = await User.findOne({ email: req.body.email });

    //check if the password supplied matches with the existing user's password
    if (!existingUser) {
        res.send({ error: "There's no user with this email" });
        return;
    }

    //check if the password supplied matches with the existing user's password
    if (!bcrypt.compareSync(req.body.password, existingUser.password)) {
        res.send({ error: "The password is incorrect" });
        return;
    }
    //send a success message and the users information
    res.send({ success: "Login Successful", user: existingUser });

});








module.exports = userRouter;