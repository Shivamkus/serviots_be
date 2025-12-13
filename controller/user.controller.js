const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config()

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(404).json({
        message: "name, email, password fields are Required ",
      });
    }
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ message: `Email: ${email} is Already Exist` });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      message: "New User Created Successfully",
      newUser,
    });
  } catch (error) {
    console.log("error on Register", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        message: "Email and Password Are Required",
      });
    }

    const existUser = await userModel.findOne({ email });
    if (!existUser) {
      return res.status(404).json({message : "User Not Found"});
    }
    const matchPassword = await bcrypt.compare(password, existUser.password);
    console.log('matchPassword', matchPassword)
    if (!matchPassword) {
      return res.status(400).json({
        message: "Password not matched",
      });
    }

    const payload = {
        id: existUser.id,
        name: existUser.name,
        email: existUser.email
    }

    const token = await jwt.sign(payload, process.env.JWT_SECREATE, {expiresIn: '2d'} )

    return res.status(200).json({ message: "Login Successfully", token });
  } catch (error) {
    console.log("error on login", error.message);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
};
