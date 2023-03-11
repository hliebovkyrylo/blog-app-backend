import { body } from "express-validator";

export const registerValidator = [
    body('email', 'invalid mail format').isEmail(),
    body('password', 'password must be at least 8 characters long').isLength({ min: 8 }),
    body('fullName', 'enter your real name').isLength({ min: 3 }),
    body('avatarUrl', 'wrong image format').optional().isURL(),
];

export const loginValidator = [
    body('email', 'Wrong email').isEmail(), 
    body('password', 'wrong password').isLength({ min: 8})
];

export const postValidator = [
    body('tags', 'Invalid tag format').optional().isString(),
    body('title', 'Enter article title').isLength({min: 3}).isString(),
    body('text', 'Enter the text of article').isLength({min: 3}).isString(),
    body('imageUrl', 'Invalid image format').optional().isString(),
];