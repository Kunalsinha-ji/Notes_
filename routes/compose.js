const express = require("express");
const router = express.Router();
const Email = require("../globalVariables/Email");
const noteModel = require("../Models/noteModel");

router.get("/", (req, res) => {
    res.render("compose");
});

router.post("/", async (req, res) => {
    let email = Email.getEmail();
    var title = req.body.title;
    var contents = req.body.contents;

    try {
        if (!email || !title) {
            res.redirect("/?message=login%20to%20save%20notes");
        } else {
            const existingNote = await noteModel.findOne({ title: title, email: email });

            if (existingNote) {
                res.redirect("/home?message=Note%20with%20title%20already%20found");
            } else {
                const newNote = new noteModel({
                    title: title,
                    contents: contents,
                    email: email
                });
                await newNote.save();
                res.redirect("/home");
            }
        }
    } catch (error) {
        console.error('Error composing note:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
