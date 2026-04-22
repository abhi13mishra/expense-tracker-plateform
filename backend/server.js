import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import incomeRouter from './routes/incomeRoute.js';
import expenseRouter from './routes/expenseRoute.js';
import dasboardRouter from './routes/dashboardRoute.js';


const app = express();

const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//DB
connectDB();

//ROUTES
app.use("/api/user", userRouter);
app.use("/api/income", incomeRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/dashboard", dasboardRouter);

app.get('/', (req, res) => {
    res.send("api working");
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})