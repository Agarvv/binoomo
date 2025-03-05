
import { login, register } from '../services/auth/AuthService.js'

export const handleRegister = async (req, res) => {
console.log("req.body", req.body)
 const { username, email, password } = req.body; 
 
 await register(username, email, password)
 
 res.status(201).json({
     message: "Welcome."
 })
}

export const handleLogin = async (req, res, next) => {

        const jwt = await login(req, res, next);  
        console.log("Generated JWT:", jwt);  


        res.cookie('jwt', jwt, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });

        res.json({
            accessToken: jwt
        });
    
};
