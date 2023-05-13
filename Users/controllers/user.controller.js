const { User } = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.json("Data Are Required!.")
    }

    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.json("Email Already Exists!.");
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = await new User({ username, email, password: hashPassword });
    newUser.save().then(() => {
      res.status(201).json("Register Successfuly!.");
    }).catch((error) => {
      res.json("Error Insert Data!." + error);
    });

  } catch (error) {
    res.json("Someting Went Wrong!.");
  }
}

exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.json("Data Are Required!.")
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json("Wrong Email or Try to Register!.");
    }

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res.json("Wrong Password!.");
    }

    const token = jwt.sign({ user_id: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true }).json("Login Successfuly!.");

  } catch (error) {
    res.json("Someting Went Wrong!." + error);
  }
}

exports.logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true, expires: new Date(0)
  }).send();
};

exports.profile = async (req, res) => {
  try {
    const { token } = req.cookies;
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    res.json(verify);
  } catch (error) {
    res.status(500).json("Something went wrong!.");
  }
};
