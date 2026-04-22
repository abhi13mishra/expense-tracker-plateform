import expenseModel from "../models/expenseModel.js";
import XLSX from 'xlsx';
import getDateRange from "../utils/dataFilter.js";

//add expense
export async function addexpense(req, res) {
    const userId = req.user._id;
    const { description, amount, category, date } = req.body;

    try {
        if (!description || !amount || !category || !date) {
            return res.status(400).json({
                success: false,
                message: "All filds are requires."
            });
        }

        const newExpense = new expenseModel({
            userId,
            description,
            amount,
            category,
            date: new Date(date)
        });
        await newExpense.save();
        res.json({
            success: true,
            message: "Expense Added Successfuly."
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
}

// get all expense
export async function getAllExpense(req, res) {
    const userId = req.user._id;
    try {
        const expense = await expenseModel.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
}

// update expense
export async function updateExpense(req, res) {
    const { id } = req.params;
    const userId = req.user._id;
    const { description, amount } = req.body;

    try {
        const updatedExpense = await expenseModel.findByIdAndUpdate(
            { _id: id, userId },
            { description, amount },
            { new: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found."
            });
        }

        return res.json({
            success: true,
            message: "Expense added successfully.",
            data: updateExpense
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
}

// delete expense
export async function deleteExpense(req, res) {
    try {
        const expense = await expenseModel.findByIdAndDelete({ _id: req.params.id });
        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found."
            });
        }
        return res.json({
            success: true,
            message: "Expense deleted successfully."
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
}

// download the data in excel sheet
export async function downloadExpenseExcel(req, res) {
    const userId = req.user._id;
    try {
        const expense = await expenseModel.find({ userId }).sort({ date: -1 });
        const plainData = expense.map((exp) => ({
            Description: exp.description,
            Amount: exp.amount,
            Category: exp.category,
            Date: new Date(exp.date).toLocaleDateString(),
        }));

        const workdheet = XLSX.utils.json_to_sheet(plainData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, workdheet, "expenseModel");
        XLSX.writeFile(workbook, "expense_details.xlsx");
        res.download("expense_details.xlsx");

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
}

//to grt expense overview
export async function getExpenseOverview(req, res) {

    try {
        const userId = req.user._id;
        const { range = "monthly" } = req.body;
        const { start, end } = getDateRange(range);

        const expense = await expenseModel.find({
            userId,
            date: { $gte: start, $lte: end },
        }).sort({ date: -1 });

        const totalExpense = expense.reduce((acc, cur) => acc + cur.amount, 0);
        const averageExpense = expense.length > 0 ? total / expense.length : 0;
        const numberOfTransactions = expense.length;

        const recentTransactions = expense.slice(0, 5);

        res.json({
            success: true,
            data: {
                totalExpense,
                averageExpense,
                numberOfTransactions,
                recentTransactions,
                range
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
}