const router = require('express').Router;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Register
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;


        //Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create new user
        user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        await user.save();

        //Create and assign a token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        //Check if user exists in database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        //Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        //Create and assign a token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.export = router;


