import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user.js";

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

