import express from "express";
import mongoose from "mongoose";
import { userController } from "./controllers/index.js";
import { registerValidator, loginValidator } from "./validation.js";
import { validationErrors, checkAuth } from "./utils/index.js";

//link mongoDB
mongoose.set('strictQuery', false);
mongoose
    .connect('mongodb+srv://testestest:123qwe456@cluster1.kut424l.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err)
)

const app = express();

app.use(express.json());

//register, login and user information
app.post('/auth/register', registerValidator, validationErrors, userController.register);
app.post('/auth/login', loginValidator, validationErrors, userController.login)
app.get('/auth/me', checkAuth, userController.getMe);


//started at localhost:4000
app.listen(4000, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server ok');
})