const express = require("express");
const bcrypt = require("bcrypt");
const path = require('path');
const saltRounds = 10;
const Email = require("../globalVariables/Email");
const userModel = require("../Models/userModel");

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Auth/signup.html"));
});

router.post("/", async (req, res) => {
    const { email, password, firstname, lastname } = req.body;
    
    if (!email || !password || !firstname || !lastname) {
        return res.status(400).send("All fields are required");
    }

    try {
        // const existingUser = await userModel.findOne({ email: email });
        
        // if (existingUser) {
        //     return res.status(400).send("User already signed up");
        // }
        const existingUser = await userModel.findOne({ email: email });
        
        if (existingUser) {
            res.redirect("/?message=User%20already%20signed%20up%20!!");
        }
        
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const newUser = new userModel({
            first_name: firstname,
            last_name: lastname,
            email: email,
            password: hashedPassword
        });

        await newUser.save();
        
        Email.setEmail(email);
        
        res.redirect("/home");
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
