const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const salaryDataRoute = require("./Routes/SalaryDataRoutes.js");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.get("/", (req,res)=>{
  return res.status(200).send({message: "Welcome to Floqer backend server..."})
});
app.get("/api", (req,res)=>{
  return res.status(200).send({message: "Welcome to Floqer backend server APIs..."})
});

// MongoDB Atlas connection string
const MONGODB_URI = process.env.MONGO_URL;

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => console.error(err));

// Routes
app.use('/api/salaryData', salaryDataRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
