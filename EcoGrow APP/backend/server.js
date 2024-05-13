const express = require ("express")
const mongoose = require ('mongoose');
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const randomize = require('randomatic');
const randomstring = require('randomstring');
const user = require("./Models/usermodel");
const crop = require("./Models/cropmodel");
const chat = require("./Models/chatmodel");


const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";

const app = express();
app.use(express.json());
app.use(cors());

// mongo DB connection 

const username = "Achintha";
const password = "Achintha#06";
const databaseName = "EcoGrow";

const encodedUsername = encodeURIComponent(username);
const encodedPassword = encodeURIComponent(password);

mongoose.connect(`mongodb+srv://${encodedUsername}:${encodedPassword}@cluster0.8swyvp9.mongodb.net/${databaseName}?retryWrites=true&w=majority`)
.then(() => {
  console.log("Successfully connected to MongoDB");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

const port= process.env.PORT || 5000

app.listen(port, ()=>{
  console.log("Server running on port", port)
})

//store location

app.post("/weather", async(req, res) => {
  try {
    const { location, weather, term } = req.body;
    console.log(term);
    if (!location || !location.latitude || !location.longitude) {
      return res.status(400).json({ error: 'Invalid location data' });
    }

    if (!weather || !weather.main || !weather.main.temp) {
      return res.status(400).json({ error: 'Invalid weather data' });
    }

    // Assuming 'temperature' is the correct field name in your model
    const newCrop = new crop({
      latitude: location.latitude,
      longitude: location.longitude,
      temperature: weather.main.temp,
      humidity: weather.main.humidity,
      termType: term,
    });

    await newCrop.save();

    res.status(201).json({ message: 'Weather data saved successfully' });
  } catch (error) {
    console.error('Error saving weather data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get crop
app.get("/crop", async (req, res) => {
  try {
    const data = await crop.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

//user register

app.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  
  try {

    const oldUser = await user.findOne({ email: email });
  
    if (oldUser) {
      return res.send("User already exists!!");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    
    await user.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: encryptedPassword,
    });
    res.send({ status: "ok", data: "User Created" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

// user login

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  try{

    const oldUser = await user.findOne({ email: email });
  
    if (!oldUser) {
      return res.send({ data: "User doesn't exists!!" });
    }
  
    const passwordMatch =await bcrypt.compare(password, oldUser.password);
   
    if (passwordMatch) {
      const token = jwt.sign({ email: oldUser.email, firstname: oldUser.firstname, lastname: oldUser.lastname}, JWT_SECRET);
      return res.send({ status: "ok", data: token });
    } else {
      return res.send({ error: "Incorrect password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


// send otp virification email

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'achinthajayatilake@gmail.com',
    pass: 'wqkdkphhrkufqllq',
  },
});

app.post('/send-otp', (req, res) => {
  const email = req.body.email;
  const otp = randomstring.generate({
    length: 6,
    charset: 'numeric',
  });

  const mailOptions = {
    from: 'achinthajayatilake@gmail.com',
    to: email,
    subject: 'Your OTP for verification',
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('OTP sent successfully');
  });
});

// user update

  app.post("/update-user", async (req, res) => {
    const { email, password } = await req.body;
    console.log(email, password);

    try{
      const userdata = await user.findOne({email});
      console.log('User Data:', userdata);

      if (!userdata) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Hashed Password:', hashedPassword);

      userdata.password = hashedPassword;
      
      const savedUser = await userdata.save();
      console.log('Updated User Data:', savedUser);
  
      res.status(200).json({ success: true, message: 'Password updated successfully' });
    
    }catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  //chat

  app.post("/chat", async (req, res) => {
    const { text } = req.body;
    try {
      await chat.create({
        userchat: text[0]["text"],
      });
      res.send({ status: "ok", data: "Chat Created" });
    } catch (error) {
      res.send({ status: "error", data: error });
    }
  })

  app.get("/chatdata", async (req, res) => {
    try {
      const data = await chat.find();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching data from MongoDB:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })