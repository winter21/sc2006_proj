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
const workoutSessionRouter = require('./src/routes/workoutSessionRouter');

//Define API Routes
app.use("/account",accountRouter);
app.use("/workoutSession",workoutSessionRouter);


app.listen(port, () => {
    console.log("Server running at http://localhost:" + port);
});
