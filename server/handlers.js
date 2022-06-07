const request = require("request-promise");
require("dotenv").config();
const { APP_ID } = process.env;

// get dummy users - API
const getDummyUsers = async (req, res) => {
    try {
        const options = {
            uri: 'https://dummyapi.io/data/v1/user?limit=10',
            headers: {"app-id": APP_ID},
        }
        const result = await request(options)
        const parsedResult = JSON.parse(result);
        res.status(200).json({ status: 200, data: parsedResult.data });
    } catch (err) {
        res.status(404).json({ status: 404, message: err.message});
    }
}


// get dummy user by ID
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const options = {
            uri: 'https://dummyapi.io/data/v1/user?limit=10',
            headers: {"app-id": APP_ID},
        }
        const result = await request(options)
        const parsedResult = JSON.parse(result);
        const user = parsedResult.data.find((user) => user.id === id);

        if(!user){
            res.status(404).json({ status: 404, data: id, message: "User ID does not exist" });
        } else {
            res.status(200).json({ status: 200, data: user });
        }
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message});
    }
}


module.exports = {
    getDummyUsers,
    getUserById
}