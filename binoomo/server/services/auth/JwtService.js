import jwt from 'jsonwebtoken';



export const generateJwt = (payload) => {
        return jwt.sign(payload, 'unsafesecret', {
            expiresIn: '7d', 
            algorithm: 'HS256'
        });
};