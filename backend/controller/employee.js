const Employee = require('../models/employee');
const redis = require('redis');
const client = redis.createClient();

//Connect to Redis
client.connect()
    .then(() => console.log("Connected to Redis !!!!"))
    .catch((err) => console.log('Redis Client Error>>>>', err));

client.on('ready', () => console.log("Client is ready to use"));

const isRedisClientConnect = async () => {
    if (client) {
        console.log("Redis Client already connected!");
        return client;
    }
    client = redis.createClient();
    return client;
}

const isCached = async (req, res, next) => {
    try {
        isRedisClientConnect();

        //First check in Redis
        const response = await client.get('employees');
        if (response) {
            const employee = JSON.parse(response);
            return res.status(200).json({ employee, message: "Data fetched from Redis call" });
        }
        next();
    }
    catch (error) {
        return res.status(400).json({ error });
    }
};

const handleGetAllEmployee = async (req, res) => {
    try {
        //Getting employee data from DB
        const employee = await Employee.find();

        //Store in Redis
        await client.setEx('employees', 20, JSON.stringify(employee));

        return res.status(200).json({ employee, message: "Data fetched from DB call" });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
};

const handleCreateNewEmployee = async (req, res) => {
    try {
        //Fetching emp data
        const oldEmployee = await Employee.find();

        const employee = await Employee.create({
            name: req.body.name,
            email: req.body.email,
            designation: req.body.designation,
            phoneNumber: req.body.phoneNumber
        });

        oldEmployee.push(employee);

        console.log("Redis Cache Expire: ", req.body.redisCacheExpire);

        isRedisClientConnect();

        //Store in Redis
        await client.setEx('employees', req.body.redisCacheExpire, JSON.stringify(oldEmployee));

        return res.status(201).json({ employee, message: "Data successfully added!" });
    }
    catch (error) {
        return res.status(400).json({ error });
    }

};

module.exports = {
    isCached,
    handleGetAllEmployee,
    handleCreateNewEmployee
}