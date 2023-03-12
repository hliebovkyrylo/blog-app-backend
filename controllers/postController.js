import postModel from "../models/post.js";

//creating post
export const createPost = async (req, res) => {
    try {
        const doc = new postModel({
            tag: req.body.tag,
            title: req.body.title,
            user: req.userID,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
        });

        const post = await doc.save();

        res.json(post);

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to create article"
        });
    };
};

//amending the article
export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;

        await postModel.updateOne({
            _id: postId
        }, {
            tag: req.body.tag,
            title: req.body.title,
            user: req.userID,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
        });

        res.json({
            success: true
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to update article"
        });
    };
};

//deleting an article
export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;

        await postModel.findOneAndDelete({
            _id: postId

        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Failed to delete article"
                });
            };

            if (!doc) {
                return res.status(404).json({
                    message: "Article not found"
                });
            };

            res.json({
                success: true
            });
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to delete article"
        });
    };
};

//get all posts
export const getAll = async (req, res) => {
    try {
        const posts = await postModel.find().populate('user').exec;

        res.json(posts);

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to retrieve articles"
        });
    };
};

//get one post
export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        postModel.findOneAndUpdate({
            _id: postId
        }, {
            returnDocument: 'after',

        }, (err, doc) => {
            if (err) {
                return res.status(500).json({
                    message: "failed to return article"
                });
            };

            if (!doc) {
                return res.status(404).json({
                    message: "Article is not found"
                });
            };

            res.json(doc);

        }).populate('user');

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to retrieve article"
        });
    };
};