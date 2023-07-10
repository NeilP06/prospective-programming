const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://prospectiveprogramming:Cb94epc6@prospectiveprogramming.ijik0jf.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => err ? console.log(err) :
        console.log('Connected to the ProsPro database!'));
 
        // Schema for users of app
        const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now,
        },  
    }
);

const User = mongoose.model('users', UserSchema);
User.createIndexes();
 
const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {
    resp.send("App is Working");
});

app.post("/register", async (req, resp) => {
    try {
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("User already register");
        }
    } catch (e) {
        resp.send("Something Went Wrong");
    }
});

app.listen(1000);