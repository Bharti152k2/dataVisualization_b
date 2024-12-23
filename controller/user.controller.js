const RegisteredUser = require("../models/signup.model");
const encryptPassword = require("../helpers/encryption");
const decryptPassword = require("../helpers/decryption");
const jwt = require("jsonwebtoken");

//^ SIGNUP API : TO SEND THE SIGNUP DATA TO BACKEND

let signUp = async (req, res, next) => {
  let {
    firstname,
    lastname,
    email,
    mobile,
    password,
    confirmPassword,
    gender,
  } = req.body;

  //!  validating before send the data

  //* for empty fields
  if (
    !firstname ||
    !email ||
    !mobile ||
    !password ||
    !confirmPassword ||
    !gender
  ) {
    return res.json({ error: false, message: "All fields are mandatory" });
  }

  //* for filled fields
  if (firstname && email && mobile && password && confirmPassword && gender) {
    //^ checking for existing users
    let existingUser = await RegisteredUser.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: true, message: "User already exists" });
    }

    //^ validation for new user
    let nameReg = /[a-zA-Z]+([ \-']{0,1}[a-zA-Z]+)*/;
    let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let mobReg = /^[6-9][0-9]{9}$/;

    if (!nameReg.test(firstname)) {
      return res
        .status(400)
        .json({ message: "Firstname should contain only alphabets" });
    } else if (lastname && !nameReg.test(lastname)) {
      return res
        .status(400)
        .json({ message: "Lastname should contain only alphabets" });
    } else if (!mobReg.test(mobile)) {
      return res.status(400).json({ message: "Enter a valid mobile number" });
    } else if (!emailReg.test(email)) {
      return res.status(400).json({ message: "Enter a valid email number" });
    } else if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "password and confirm password should match" });
    } else {
      let signupUser = await RegisteredUser.create({
        firstname,
        lastname,
        email,
        mobile,
        password: await encryptPassword(confirmPassword),
        gender,
      });
      // console.log(signupUser);
      return res.status(201).json({
        error: false,
        message: "Registered Succesfully",
        data: signupUser,
      });
    }
  }
};

//^ LOGIN API : TO CHECK THE LOGIN DATA FROM BACKEND
let generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      name: user.firstname,
    },
    "123",
    { expiresIn: "30m" }
  );
};
let login = async (req, res, next) => {
  let { username, password } = req.body;
  //!  validating before send the data

  //* for empty fields
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: false, message: "All fields are mandatory" });
  }

  //* for filled fields
  if (username && password) {
    //^ for entered data

    //* validating for username is email or mobile
    let isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      username
    );
    let isMobile = /^[6-9][0-9]{9}$/.test(username);

    if (!isEmail && !isMobile) {
      return res.status(400).json({ error: true, message: "Invalid username" });
    }

    //* checking for existing users

    let existingUser;
    if (isEmail || isMobile) {
      existingUser = await RegisteredUser.findOne({
        $or: [{ mobile: username }, { email: username }],
      });
    }
    console.log(existingUser);

    //* validation for user login
    if (existingUser) {
      if (await decryptPassword(password, existingUser.password)) {
        let token = generateToken(existingUser);

        return res.status(201).json({
          error: false,
          message: "Logged in Successfully",
          token,
          userId: existingUser._id,
          email: existingUser.email,
          name: existingUser.firstname,
        });
      } else {
        return res
          .status(400)
          .json({ error: true, message: "Incorrect password" });
      }
    }
    return res.status(400).json({ error: true, message: "User not found" });
  }
};

module.exports = {
  signUp,
  login,
};
