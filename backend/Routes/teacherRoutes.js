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

module.exports = router;