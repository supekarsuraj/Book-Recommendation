// const userModels = require('../models/userModel');
const userModel =require('../models/user_models')
const jwtMiddleware = require('../middleware/jwtMiddleware');

const signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await userModel.User.findOne({ name: username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const newUser = new userModel.User({ name: username, password });
        await newUser.save();
        const token = jwtMiddleware.generateToken({ username });
        res.status(200).json({ message: "User created successfully", token });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(25, req.body, typeof(username), typeof(password))
    try {
        const user = await userModel.User.findOne({ name: username, password : password });
        if (user) {
            const token = jwtMiddleware.generateToken({ username });
            return res.status(200).json({ message: "Logged in successfully", token });
        } else {
            return res.status(404).json({ message: "User not found or invalid credentials" });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { signup, login };
