const Employee = require('../models/employee');
const redis = require('redis');

//Connect to Redis
const client = redis.createClient();

client.on('error', err => console.log('Redis Client Error', err));
client.connect()
      .then(() => console.log("Connected to Redis !!!!"))
      .catch((err) => console.log('Redis Client Error', err));

const isCached = async (req, res, next) => {
    //First check in Redis
    const response = await client.get('employees'); 
      if (response) {
        const employee = JSON.parse(response);
        return res.status(200).json({employee, message: "Data fetched from Redis call"});
      }
      next();
};

const handleGetAllEmployee = async (req, res) => {
    const employee = await Employee.find();
    console.log("employee>>>", employee);

    return res.status(200).json({ employee, message: "Data fetched from DB call" });
};

const handleCreateNewEmployee = async (req, res) => {

    const employee = await Employee.create({
        name: req.body.name,
        email: req.body.email,
        designation: req.body.designation,
        phoneNumber: req.body.phoneNumber
    });
    console.log("employee>>>", employee);

    //Store in Redis
    await client.setEx('employees', 3600, JSON.stringify(employee));

    return res.status(201).json({ employee, message: "Data successfully added!" });

};

module.exports = {
    isCached,
    handleGetAllEmployee,
    handleCreateNewEmployee
}