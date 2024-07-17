const express = require("express");
const router = express.Router();
const path = require("path");
const Title = require("../globalVariables/title");
const Email = require("../globalVariables/Email");
const noteModel = require("../Models/noteModel");

router.get("/:title", async (req, res) => {
    Title.setTitle(req.params.title);
    res.render("edit");
});

router.post("/", async (req, res) => {
    const title = Title.getTitle();
    const content = req.body.contents;
    const email = Email.getEmail();

    try {
        await noteModel.findOneAndUpdate(
            { title: title, email: email },
            { contents: content },
            { new: true, upsert: true }
        );

        res.redirect("/home");
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
