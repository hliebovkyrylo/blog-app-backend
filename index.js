import express from "express";
import mongoose from "mongoose";
import { userController } from "./controllers/index.js";
import { registerValidator } from "./validation.js";
import { validationErrors } from "./utils/index.js";

mongoose.set('strictQuery', false);
mongoose
    .connect('mongodb+srv://testestest:123qwe456@cluster1.kut424l.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err)
)

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidator, validationErrors, userController.register);


app.listen(4000, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server ok');
})