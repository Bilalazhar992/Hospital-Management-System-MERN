const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Add this line
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/signup', require('./routes/signup'));
app.use('/api/login', require('./routes/login'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/doctor', require('./routes/doctor'));
app.use('/api/patient', require('./routes/patient'));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Hospital Management System API');
});

// --------------------------DEPLOYMENT------------------------------
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  // 1. Tell Express where the frontend build folder is
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  // 2. For any other route, send the React index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running Successfully");
  });
}
// --------------------------DEPLOYMENT------------------------------
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
