const express = require("express");
const teacherScheam = require("../Model/teacherSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const middleware = require("../Middleware/middleWare")
const router = express.Router();

router.post("/teacher/register", async(req,res)=>{
    try{
        const{name,email,contact,password,confirmPassword} = req.body;
        let exist = await teacherScheam.findOne({ $or: [{ email }, { contact }] });
        if(exist){
            return res.status(400).send("User Already Exists")
        }
        if(password !== confirmPassword){
            return res.status(400).send("passwords not matching")
        }
        //pasword hashing
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await teacherScheam.create({
            name,
            email,
            contact,
            password: hashPassword,
            confirmPassword: hashPassword
        });
        res.status(201).send("Registration Successfully")
    }
    catch(err){
        console.log(err);
        res.status(400).send("registration Failed")
    }
})
router.post("/teacher/login", async (req, res) => {
    try {
      const { contact, password } = req.body;
      let exists = await teacherScheam.findOne({ contact });
      if (!exists) {
        return res.status(400).json({ msg: "User Not Found" });
      }
      const isMatch = await bcrypt.compare(password, exists.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      let payload = {
        user: {
          id: exists.id,
        },
      };
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          return res.json({ token, msg: "Login Successfully" });
        }
      );
    } catch (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
});
router.get("/teacher/profile", middleware, async (req, res) => {
    try {
      const user = await teacherScheam.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Exclude sensitive information like password
      res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }
  });

  
// Forgot Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const resetToken = generateResetToken(user);
    user.resetToken = resetToken;
    await user.save();
    sendResetEmail(user.email, resetToken);
    return res.status(200).send("Password reset email sent");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});
function generateResetToken(user) {
  const payload = {
    user: {
      id: user.id,
      email: user.email
    },
  };
  const token = jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
  return token;
}
async function sendResetEmail(email, resetToken) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "ugram.raju@gmail.com",
      pass: "droehvttsguxpnwf",
    },
  });

  const mailOptions = {
    from: "ugram.raju@gmail.com",
    to: email,
    subject: "Password Reset",
    text: `Please click the following link to reset your password: https://studyapplication.onrender.com/api/reset-password/${resetToken}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Reset email sent to ${email}. Message ID: ${info.messageId}`);
  } catch (error) {
    console.error("Error sending reset email:", error);
    throw error;
  }
}

// Reset Password
router.post("/reset-password/:resetToken", async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(resetToken, process.env.jwtSecret);
    const { user: { id: userId } } = decoded;

    const user = await userSchema.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send("Invalid or expired reset token");
    }

    if (!newPassword) {
      return res.status(400).send("New password is required");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    await user.save();
    return res.status(200).send("Password reset successful");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});


router.get("/reset-password/:resetToken", async (req, res) => {
  const { resetToken } = req.params;
  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(resetToken, process.env.jwtSecret, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
 console.log(decoded);
    const { email } = decoded.user;
    res.render("reset-password", { email: email });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});
module.exports = router;