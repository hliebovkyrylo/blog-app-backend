import { body } from "express-validator";

export const registerValidator = [
    body('email', 'invalid mail format').isEmail(),
    body('password', 'wrong password').isLength({ min: 8 }),
    body('fullName', 'enter your real name').isLength({ min: 3 }),
    body('avatarUrl', 'wrong avatar format').optional().isURL(),
];