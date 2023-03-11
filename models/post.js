import mongoose from "mongoose";

//article parameters
const postShema = new mongoose.Schema({
    tag: {
        type: Array,
        default: [],
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
}, {
    timestamps: {
        type: String,
    },
},
);

export default mongoose.model('Post', postShema);