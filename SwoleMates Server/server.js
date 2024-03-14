const express = require("express");
const connectDB = require("./src/middlewares/db");
const dotenv = require('dotenv');
dotenv.config();

// Express Code
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

//db connection
connectDB();

//Import routes
const accountRouter = require('./src/routes/accountRouter');

//Define API Routes
app.use("/account",accountRouter);


app.listen(port, () => {
    console.log("Server running at http://localhost:" + port);
});
