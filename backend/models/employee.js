const mongoose = require('mongoose');

// Define Schema
const employeeSchema = new mongoose.Schema({
   name: {
      type: String
   },
   email: {
      type: String
   },
   designation: {
      type: String
   },
   phoneNumber: {
      type: Number
   }
});

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;