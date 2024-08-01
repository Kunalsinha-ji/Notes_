const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
require("dotenv").config();
const userModel = require("./Models/userModel");

const Email = require("./globalVariables/Email");

const signupRouter = require('./routes/signup');
const homeRouter = require('./routes/home');
const composeRouter = require('./routes/compose');
const contactRouter = require("./routes/contact");
const aboutRouter = require("./routes/about");
const deleteRouter = require("./routes/delete");
const editRouter = require("./routes/edit");

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/signup', signupRouter);
app.use('/home', homeRouter);
app.use('/compose', composeRouter);
app.use('/contact', contactRouter);
app.use('/about', aboutRouter);
app.use('/delete', deleteRouter);
app.use('/edit', editRouter);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Auth/login.html");
});

app.post("/", async (req, res) => {
    const mail = req.body.email;
    const password = req.body.password;

    try {
        const user = await userModel.findOne({ email: mail });
        if (!user) {
            return res.redirect('/?message=No%20user%20found');
        } else {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                Email.setEmail(mail);
                res.redirect('/home');
            } else {
                return res.redirect('/?message=Invalid%20Credentials%20!!');
            }
        }
    } catch (error) {
        console.error('Database query error:', error);
        return res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server active at port: ${port}`);
});
