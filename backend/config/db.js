import mongoose from 'mongoose';
export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://rajyadavu723_db_user:iBZCZ6u6B6Tp5vcY@cluster0.4nvoeti.mongodb.net/Expense");
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB Error:", error.message);
        process.exit(1);
    }
};