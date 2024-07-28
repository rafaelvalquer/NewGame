const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send("Error registering user");
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send("Invalid username or password");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid username or password");
        }
        res.send("Login successful");
    } catch (error) {
        res.status(500).send("Error logging in");
    }
};

exports.listUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
};
