const jwt = require('jsonwebtoken');
const { userRecords } = require('../controller');

//Create user
exports.registeredUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (![userName, password, email].every(Boolean)) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        const existingUser = await userRecords.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = new userRecords({ userName, password, email });
        const data = await user.save();

        res.status(201).send({ message: "User added successfully!", data });
    } catch (err) {
        console.error("Error adding user:", err.message);
        res.status(500).send({ message: "An error occured while creating the user." });
    }
};

//Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userRecords.findOne({ userName });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const tokenPayLoad = { userName: user.userName, email: userEmail, id: user._id };
        const token = jwt.sign(tokenPayLoad, process.env.JWT_SECRET || '12345', { expireIn: '12h' });

        res.status(200).send({ message: "Login Successfull!", token, email: user.email, id: user._id });
    } catch (error) {
        console.error("Error logging in user: ", err.message);
        res.status(500).send({ message: "An error occured while logging in the user." });
    }
};

exports.userDashboard = async (req, res) => {
    const { userName } = req.body;

    try {
        const user = await userRecords.findOne({ userName });
        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }

        res.status(200).send({ message: "User found successfully!", user });
    } catch (err) {
        console.error("Error finding user:", err.message);
        res.status(500).send({ message: "An error occurred while finding the user." });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userRecords.findById(id);
        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }

        res.status(200).send({ message: "User found successfully!", user });
    } catch (error) {
        console.error("Error finding user by ID:", error.message);
        res.status(500).send({ message: "An error occurred while finding the user." });
    }
};