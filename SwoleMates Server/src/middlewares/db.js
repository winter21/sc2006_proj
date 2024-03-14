const mongoose = require('mongoose');

let dbConnection

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://swolemates:pw123@swolemates.h1nkjt8.mongodb.net/Swolemates');
        console.log("MongoDB Connected: " + conn.connection.host);
    }catch (error) {
        console.error('Error connecting to MongoDB!', error);
        process.exit(1)
    }
}

module.exports = connectDB;