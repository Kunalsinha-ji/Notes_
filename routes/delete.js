const express = require("express");
const router = express.Router();
const noteModel = require("../Models/noteModel");
const { getEmail } = require("../globalVariables/Email");

router.get("/:title", async (req, res) => {
    const title = req.params.title;
    const email = getEmail();
    try {
        await noteModel.deleteOne({ title: title ,email : email});
        res.redirect("/home");
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
