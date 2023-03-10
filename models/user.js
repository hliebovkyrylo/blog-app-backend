import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    avatarUrl: {
        type: String,
    },
    passwordHash: {
        type: String,
        required: true,
    },
},
{
    timestamps: String,
}
);

export default mongoose.model('User', userShema);