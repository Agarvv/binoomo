import bcrypt from "bcrypt";
import passport from './passport.js';
import pool from '../../config/database.js'
import { generateJwt } from './JwtService.js'

export const register = async (username, email, password) => {
    
        const userExists = await verifyUserExists(username, email);
        
        // soon im gonna ad a custom exception 
        if (userExists) throw new Error('Username Or Email Exists already');

        const hashedPassword = await makePassword(password);

        await pool.query('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', [username, email, hashedPassword]);
};


export const login = async (req, res, next) => {
    // Passport handles this with callbacks, so i have to use Promises
    return new Promise((resolve, reject) => {
        // try to authenticate the user
        passport.authenticate('local', (err, user, info) => {
            
            if (err) return reject(err);  
            
            // try login user
            req.logIn(user, (err) => {
                if (err) return reject(err); 
                
                // if login successfull, generate jwt and return jwt.
                // passport will set the user object in req.user if the login is successfull
                // and we will have access to req.isAuthenticated to see if the user is authenticated
                // thats why passport is so powerfull.
                const jwtPayload = {
                    userId: user.user_id,
                    email: user.email,
                    username: user.username
                };

                const jwt = generateJwt(jwtPayload);  
 
                resolve(jwt);  
            });
        })(req, res, next);
    });
};



export const comparePassword = async (rawPassword, encryptedPassword) => {
    try {
        return await bcrypt.compare(rawPassword, encryptedPassword);
    } catch (err) {
        console.error("Error comparing passwords:", err);
        throw cerr;
    }
};

export const makePassword = async (raw) => {
    try {
        return await bcrypt.hash(raw, 13);
    } catch (err) {
        console.error("Error hashing password:", err);
        throw err;
    }
};

// find user BY email, username, id, etc
// ex: findUserBy("userId", 5)
export const findUserBy = async (by, value) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM users WHERE ${by} = ?`, [value]);
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        console.error("Error finding user:", err);
        throw err;
    }
};

export const verifyUserExists = async (username, email) => {
        const [rows] = await pool.query(
            `SELECT user_id FROM users WHERE username = ? OR email = ? LIMIT 1`, 
            [username, email]
        );
        
        return rows.length > 0;
};