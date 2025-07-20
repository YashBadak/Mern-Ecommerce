const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const userModel = require('../../models/userModel');

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email }); // Fix here

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new userModel({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Registration successful",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await userModel.findOne({ email }).select('+password');

    if (!checkUser) {
      return res.status(404).json({ success: false, message: "User doesn't exist" });
    }

    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);

    if (!checkPasswordMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName
      },
      'JWT_SECRET',
      { expiresIn: '60m' }
    );

    // res
    //   .cookie('token', token, { httpOnly: true, secure: true })
    //   .json({
    //     success: true,
    //     message: "Logged in successfully",
    //     user: {
    //       email: checkUser.email,
    //       id: checkUser._id,
    //       role: checkUser.role,
    //       userName: checkUser.userName
    //     },
    //   });
    res.status(200).json({
      success:true,
      message: "Logged In SuccessFully",
      token,
      user: {
          email: checkUser.email,
          id: checkUser._id,
          role: checkUser.role,
          userName: checkUser.userName
        },

    })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

//logout

const logoutUser = async (req, res) => {
  res.clearCookie('token').json({
    success: true,
    message: "User Successfully Logout"
  })
}

//Auth MiddleWare
// const authMiddleware = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) return res.status(401).json({
//     success: false,
//     message: "UnAuthorized User"
//   })
//   try {
//     const decoded = jwt.verify(token, 'JWT_SECRET');
//     req.user = decoded;
//     next();
//   }
//   catch (err) {
//     res.status(401).json({
//       success: false,
//       message: "UnAuthorized User"
//     })
//   }
// }
const authMiddleware = async (req, res, next) => {
  const authHeader= req.headers['authorization'];
  const token= authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({
    success: false,
    message: "UnAuthorized User"
  })
  try {
    const decoded = jwt.verify(token, 'JWT_SECRET');
    req.user = decoded;
    next();
  }
  catch (err) {
    res.status(401).json({
      success: false,
      message: "UnAuthorized User"
    })
  }
}



module.exports = { registerUser, loginUser, logoutUser, authMiddleware };