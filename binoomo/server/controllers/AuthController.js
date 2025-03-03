const pool = require('../config/database.js')
const { login, register } = require('../services/AuthService.js')

export const register = async (req, res) => {
 const { username, email, password } = req.body; 
 

}

export const login = async (req, res) => {
 const { email, password } = req.body; 

}
