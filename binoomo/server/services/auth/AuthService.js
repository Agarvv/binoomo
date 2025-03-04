import bcrypt from "bcrypt";
import passport from './passport.js';
import pool from '../../config/database.js'
import { generateJwt } from './JwtService.js'

export const register = async (username, email, password) => {
    
        const userExists = await userExists(username, email);
        
        // soon im gonna ad a custom exception 
        if (userExists) throw new Error('Username Or Email Exists already');

        const hashedPassword = await makePassword(password);

        await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
};


export const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);

        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        req.logIn(user, (err) => {
            if (err) return next(err);
            
            const jwtPayload = {
                userId: user.id,
                email: user.email,
                username: user.username
            }
            
            const jwt = generateJwt(jwtPayload);
            
            return res.json({ jwt });
        });
    })(req, res, next);
};


export const comparePassword = async (rawPassword, encryptedPassword) => {
    try {
        return await bcrypt.compare(rawPassword, encryptedPassword);
    } catch (err) {
        console.error("Error comparing passwords:", err);
        throw err;
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
export const findUserBy = async (by, value) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM users WHERE ${by} = ?`, [value]);
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        console.error("Error finding user:", err);
        throw err;
    }
};

export const userExists = async (username, email) => {
        const [rows] = await pool.query(
            `SELECT id FROM users WHERE username = ? OR email = ? LIMIT 1`, 
            [username, email]
        );
        
        return rows.length > 0;
};