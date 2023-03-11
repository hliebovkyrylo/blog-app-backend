import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decode = jwt.verify(token, 'pas555sword');

            req.userID = decode._id;

            next();

        } catch (err) {
            return res.status(403).json({
                message: "No access"
            });
        };

    } else {
        return res.status(403).json({
            message: "No access"
        });
    };
};