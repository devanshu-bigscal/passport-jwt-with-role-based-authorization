const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            firstName,
            lastName,
            email,
            password: hash,
        });

        if (!user) throw new Error("Error while creating user account");

        return res
            .status(200)
            .json({ message: "user account created successfully", user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Bad Request !!' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ where: { email: email } });

        if (!user)
            throw new Error("No user account found with requested email address");

        const value = await bcrypt.compare(password, user.password);

        if (!value) throw new Error("Password for Email address do not match");

        const token = jwt.sign(
            { email: user.email, role: user.role },
            process.env.JWT_SECRET
        );

        if (!token) throw new Error("Problem while generating auth credentials");

        return res.status(200).json({ token: `${token}` })
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
};



exports.getProfile = async (req, res) => {

    try {
        const { email } = req.user
        const user = await userModel.findOne({ where: { email: email }, attributes: { exclude: ['createdAt', 'password', 'updatedAt', 'id'] } })

        if (!user) throw new Error("User not found")

        return res.status(200).json({ message: "User profile fetched successfully", user })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: { message: "Internal Server Error" } })
    }
}