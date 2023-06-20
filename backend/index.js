const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const fileupload = require("express-fileupload");
const studentRouter = require("./Routes/studentRoutes");
const teacherRouter = require("./Routes/teacherRoutes");
const proposalsRouter = require("./Routes/proposalsRoutes");

const app = express();
const PORT = process.env.PORT || 8000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors({
  origin: "https://studyapplication.netlify.app",
  credentials: true
}));
app.use(fileupload({
  useTempFiles: true
}));

app.use("/api", studentRouter);
app.use("/api", teacherRouter);
app.use("/api", proposalsRouter);
app.listen(PORT, () => console.log(`App Listen On Port ${PORT}`));
mongoose.connect(process.env.MONGO_CONNECTION,{
  useUnifiedTopology:true,
  useNewUrlParser:true
})
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  });
