import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { addexpense, deleteExpense, downloadExpenseExcel, getAllExpense, getExpenseOverview, updateExpense } from '../controllers/expenseController.js';

const expenseRouter = express.Router();
expenseRouter.post("/add", authMiddleware, addexpense);
expenseRouter.get("/get", authMiddleware, getAllExpense);
expenseRouter.put("/update/:id", authMiddleware, updateExpense);
expenseRouter.get("/downloadeexcel", authMiddleware, downloadExpenseExcel);
expenseRouter.delete("/delete/:id", authMiddleware, deleteExpense);
expenseRouter.get("/overview", authMiddleware, getExpenseOverview);

export default expenseRouter;
