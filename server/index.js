const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

require("./db/config")();

const router = express.Router();

app.use(express.json());
app.use(cors());


//const Home = require("./controllers/controller");
const LoginRoute = require("./routes/LoginRoute");
const RegisterRoute = require("./routes/RegisterRoute");
//const verifyToken = require("./Middleware/middleware");
const RecipeRoute = require("./routes/RecipeRoute");
const ForgotPassword = require("./routes/forgotPassword");



app.get('/',(req,res)=>{
  res.send("server is running.....")
})

//helath route
app.get('/health',(req,res)=>{
  res.send("server is healthy !")
})

app.use("/auth", LoginRoute);
app.use("/auth", RegisterRoute);
app.use("/auth", RecipeRoute);
app.use("/auth", router);
app.use("/auth", ForgotPassword);

//router.get("/", verifyToken, Home.Home);

//module.exports = router;


  app.listen(process.env.PORT, () => {
    console.log(`Server Started on port ${process.env.PORT}`);
  });

