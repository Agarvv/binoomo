const express = require('express');
const authRouter = require('./auth.js')


export const router = express.Router();

router.use('/auth', authRouter)