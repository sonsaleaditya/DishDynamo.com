const User = require("../Schema/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ userNotExist : true,  error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ PassNotMatch : true, error: "Incorrect password" });
    }

    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.SECRET
    );



    res.json({
      success : true,
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });


  } catch (e) {
    console.error(e.message);
    res.status(500).json({success : false,  error: "Internal server error" });
  }
};

module.exports = Login;
