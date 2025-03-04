const express = require("express");
const dbConnect = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const initializeSocket  = require("./config/socket")
const cors =  require("cors")

const app = express();
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
const httpServer = app.listen(8080, () => {
    console.log("Server running on port 8080");
});


initializeSocket(httpServer);
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
      useTempFiles : true, 
      tempFileDir : '/tmp/'
  }));




const sendotp  =  require("./routes/userRoute");
app.use("/api" , sendotp)
dbConnect();


