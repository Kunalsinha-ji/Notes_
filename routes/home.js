const express = require("express");
const path = require("path");
const Email = require("../globalVariables/Email");
const noteModel = require("../Models/noteModel");

const router = express.Router();

router.get("/", async (req, res) => {
    const email = Email.getEmail();
    
    if (!email) {
        return res.redirect("/");
    }

    try {
        const notes = await noteModel.find({ email: email });
        res.render("home", { notes: notes });
    } catch (err) {
        console.error('Error fetching notes:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
