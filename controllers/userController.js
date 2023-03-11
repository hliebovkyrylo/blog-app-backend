import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user.js";

//user registration
export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);

        const doc = new userModel({
            fullName: req.body.fullName,
            email: req.body.email,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'pas555sword',
            {
                expiresIn: '30d'
            },
        );

        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to register'
        });
    };
};

//user login
export const login = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });

        if (!user) { //user presence check
            res.status(400).json({
                message: "User is not found"
            });
        };

        const correctPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!correctPass) { //password check
            res.status(400).json({
                message: "Wrong email or password"
            });
        };

        const token = jwt.sign(
            {
                _id: user._id
            },
            'pas555sword',
            {
                expiresIn: '30d'
            },
        );

        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token,
        });


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to login"
        });
    };
};

//information about user
export const getMe = async (req, res) => {
    try {
        const user = await userModel.findById(req.userID);

        if (!user) {
            res.status(400).json({
                message: "User is not found"
            });
        };

        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "No access"
        });
    };
};

