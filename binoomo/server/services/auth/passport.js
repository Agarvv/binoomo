 
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import pool from '../../config/database.js'
import { findUserBy } from './AuthService.js'
import { comparePassword } from './AuthService.js';


// this is used in the AuthService when you call passport.authenticate
passport.use(new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' }, 
    async (username, password, done) => {
        
            const user = await findUserBy("username", username)
            // soon im gonna ad a custom exception 
            if(user == null) throw new Error("User not found")

            const match = await comparePassword(password, user.password_hash);
            if (!match) {
                // failure
                return done(null, false, { message: 'Wrong Password.' });
            }
            
            // success
            return done(null, user);
    }
));

// this section allows you to have al the user authentication objects in the req
// ex: req.user,
// req.isAuthenticated boolean
passport.serializeUser((user, done) => {
    done(null, user.user_id);
});


passport.deserializeUser(async (id, done) => {

        const user = await findUserBy("user_id", id)
        console.log("deserialize user", user)
        done(null, user);
});

export default passport;