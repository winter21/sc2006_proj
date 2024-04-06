const express = require("express");
const connectDB = require("./src/middlewares/db");
const dotenv = require('dotenv');
const path = require("path");
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
const userRouter = require('./src/routes/userRouter');
const workoutSessionRouter = require('./src/routes/workoutSessionRouter');
const gymRouter = require('./src/routes/gymRouter');
const gymReviewRouter = require('./src/routes/gymReviewRouter');


//Define API Routes
app.use("/account",accountRouter);
app.use("/user",userRouter);
app.use("/workoutSession",workoutSessionRouter);
app.use("/gym",gymRouter);
app.use("/gymReview",gymReviewRouter);
app.use("/public", express.static(path.join(__dirname, "public")));


app.listen(port, () => {
    console.log("Server running at http://localhost:" + port);
});
