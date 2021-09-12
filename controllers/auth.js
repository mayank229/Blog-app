const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/index');
const { wlogger } = require('../config/index');

// POST /auth/signup
exports.postSignup = async function(req, res, next) {
    wlogger.debug('postSignup: ', req.body);
    // Checking if the signup info is completed or not
    if (!req.body.name || req.body.name === '' || !req.body.email || req.body.email === '' || !req.body.password || req.body.password === '') {
        return res.status(400).json({
           success: false,
           message: 'fill all the required fields name, email and password to signup'
        });
    }

    try {
        // Check if the user email already exist
        const ifUserExist = await User.getUserByEmail(req.body.email);
        if (ifUserExist) {
            wlogger.debug(`User exist with email ${req.body.email}`);
            return res.status(409).json({
                success: false,
                message: 'This email is already taken.',
                errors: {
                    email: 'This email is already taken.'
                }
            });
        }
        // Add user in db
        const user = await User.addUser(req.body);
        if (user) {
            wlogger.info(`User registered successfully with email: ${req.body.email}`);
            delete req.body.password;
            res.status(200).json({
                success: true,
                message: `Sign up success ${user.email}.`,
                user: user
            });
        }
    } catch(error) {
        wlogger.error('Error in postSignup: ', error);
        return res.status(400).json({
            success: false,
            message: 'Could not process the form.'
        });
    }
};

// POST /auth/login
exports.postLogin = async function(req, res, next) {
    wlogger.debug('postLogin: ', req.body);
    // Checking if the login info is completed or not
    if (req.body.email === '' || req.body.password === '') {
        return res.status(400).json({
           success: false,
           message: 'fill the complete login form with email and password'
        });
    }

    try {
        // Check if user exist with the entered email
        const user = await User.getUserByEmail(req.body.email);
        if(!user) {
            wlogger.debug(`Incorrect email or email not found:  ${req.body.email}`);
            return res.status(400).json({
                success: false,
                message: "Incorrect credentials"
            });
        }
        // Checkf if the password is correct for the user
        const match = await User.comparePassword(req.body.password, user.password);
        if(!match) {
            wlogger.debug(`Incorrect password for email ${req.body.email}`);
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            });
        }
        // Generating JWT token containing user _id and storing it in the cookies
        const token = jwt.sign({ _id: user._id }, jwtSecret);
        res.cookie('jwt', token);

        wlogger.info(`User login successful with email: ${req.body.email}`);
        return res.status(200).json({
            success: true,
            message: 'Login success.',
            user: user,
            token: token
        });
    } catch (error) {
        wlogger.error('Error in postLogin: ', error);
        console.log(error)
        return res.status(400).json({
            success: false,
            message: 'Could not process the login.'
        });
    }
};