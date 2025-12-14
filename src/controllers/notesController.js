import noteSchema from "../models/noteSchema.js";

export const createTodo = async (req, res) => {
    try {
        const { title } = req.body;
        const createdTodo = await noteSchema.create({
            title: title,
            userId: req.userId
        });
        
        return res.status(201).json({
            success: true,
            message: "Todo created successfully!",
            createdTodo,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message,
        });
    }
};

export const getAllTodo = async (req, res) => {
    try {
        const todos = await noteSchema.find({ userId: req.userId });
        if (todos.length == 0) {
            return res.status(401).json({
                success: false,
                message: "No Note found yet!",
                todos : []
            });
        }
        return res.status(200).json({
            success: true,
            message: "Note fetched successfully",
            todos,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message,
        });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        if (!id || id === " ") {
            return res.status(401).json({
                success: false,
                message: "notes's id not found!",
            });
        }

        const updatedData = await noteSchema.findOneAndUpdate(
            {
                userId: req.userId,
                _id: id,
            },
            {
                title: title,
            },
            { new: true }
        );

        if (!updatedData) {
            return res.status(401).json({
                success: false,
                message: "No Note found for update!",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Note has been updated successfully!",
            updatedData,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message,
        });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || id === " ") {
            return res.status(401).json({
                success: false,
                message: "todo's id not found!",
            });
        }

        const deletedData = await noteSchema.findOneAndDelete({
            userId: req.userId,
            _id: id,
        });
        if (!deletedData) {
            return res.status(401).json({
                success: false,
                message: "No todo found for delete!",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully!",
            deletedData,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message,
        });
    }
};

