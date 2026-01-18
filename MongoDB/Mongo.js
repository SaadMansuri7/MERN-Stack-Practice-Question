{
    // import mongoose from 'mongoose'
    // MongoDB Connection

    const PORT = process.env.PORT || 5000
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/expenseTracker'

    mongoose.connect(MONGO_URI)
        .then(() => {
            console.log('Connected to MongoDB')
            app.listen(PORT, () => {
                console.log(`Server is running on port ${`http://localhost:${PORT}`}`)
            })
        })
        .catch((err) => {
            console.error('MongoDB connection error:', err)
        });
}

{
    // User Schema and Model Definition

    // import mongoose from "mongoose";
    // import bcrypt from "bcryptjs";

    const userSchema = new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    })

    userSchema.pre('save', async function (next) {
        if (!this.isModified('password')) {
            return next();
        }

        this.password = await bcrypt.hash(this.password, 10)
        next()
    })

    userSchema.methods.comparePassword = async function (password) {
        return await bcrypt.compare(password, this.password)
    }


    const User = mongoose.model("User", userSchema)
}

{
    // Transaction Schema and Model Definition with Budget and User References
    // import mongoose from "mongoose";

    const TransactionSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        category: { type: String, required: true },
        subcategory: { type: String, required: true },
        amount: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
        type: {
            type: String,
            enum: ["income", "expense"],
            required: true
        },
        budget: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Budget",
            default: null,
        },
    })

    const Transaction = mongoose.model("Transaction", TransactionSchema)
}

{
    // how to create a new transaction/record in MongoDB with reference to Budget

    // import Transaction from "../model/TransactionModel.js"
    // const Budget from "../model/BudgetModel.js"
    const { userId, category, subcategory, amount, type, createdAt } = req.body

    const budget = await Budget.findOne({ userId, category, subcategory })

    const transaction = new Transaction({
        ...req.body,
        budget: budget ? budget._id : null
    })
    await transaction.save()

}

{
    // how to modify existing transaction record in MongoDB

    // import Transaction from "../model/TransactionModel.js"
    const { id } = req.params
    const transaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true })
    console.log('from edit funtion : ', transaction)
    if (!transaction) {
        return res.status(404).json({ message: 'transaction not found' })
    }
    res.status(200).json({ message: 'Transaction updated successfully', transaction: transaction })
}

{
    // how to delete existing transaction record in MongoDB

    // import Transaction from "../model/TransactionModel.js"
    const { id } = req.params
    await Transaction.findByIdAndDelete(id)
    res.status(204).json({ message: 'Transaction deleted successfully' })
}

{
    // how to get all transactions for a user from MongoDB

    // import Transaction from "../model/TransactionModel.js"
    const { id } = req.user
    const transactions = await Transaction.find({ userId: id })
    res.status(200).json({ transactions })
}

{
    // how to get a single transaction by ID from MongoDB

    // import Transaction from "../model/TransactionModel.js"
    const { id } = req.params
    const transaction = await Transaction.findById(id)
    if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' })
    }
    res.status(200).json({ transaction })
}
