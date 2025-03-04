
const { login, register } = require('../services/AuthService.js')

export const register = async (req, res) => {
 const { username, email, password } = req.body; 
 
 await register(username, email, password)
 
 res.status(201).json({
     message: "Welcome."
 })
}

export const login = (req, res, next) => {
    const jwt = login(req, res, next); 
    res.cookie('jwt', jwt, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    })
    res.json({
        accessToken: jwt
    })
};
 