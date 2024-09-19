const mongoose = require('mongoose');

// Connecting to MongoDB (adjust the port and database as needed)
mongoose.connect("mongodb://127.0.0.1:27017/backend");

// Defining the Employee Schema
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  course: [{ type: String }], // Assuming multiple courses can be selected
  image: { type: Buffer }, // For file uploads, it's better to use Buffer for image storage
  createdAt:{type:Date,default:Date.now()}
});

// Exporting the model
module.exports = mongoose.model('Employee', employeeSchema);
