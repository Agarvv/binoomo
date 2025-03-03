const express = require('express');
const { login, register } = require('../controllers/AuthController.js')

export const authRouter = express.Router();

authRouter.post('/register', register)
authRouter.post('/login', login)