const router = require("express").Router();
const todoSchema = require("../models/todo");

const validateID = (id) => {
    if (!id) {
        throw new Error("ID is required");
    }
};

router.get("/todos", async (req, res, next) => {
    try {
        const todos = await todoSchema.find();
        res.json(todos);
    } catch (error) {
        next(error);
    }
});

router.post("/todo", async (req, res, next) => {
    try {
        const todo = new todoSchema(req.body);
        const created = await todo.save();
        res.json(created);
    } catch (error) {
        next(error);
    }
});

router.delete("/todo/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        validateID(id);
        const todo = await todoSchema.findByIdAndDelete(id);
        res.json(todo);
    } catch (error) {
        next(error);
    }
});

router.put("/todo/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        validateID(id);
        const todo = await todoSchema.findByIdAndUpdate(id, req.body, { new: true });
        console.log(todo);
        if (!todo) {
            throw new Error("ID not found");
        }
        res.json(todo);
    } catch (error) {
        next(error);
    }
});

module.exports = router;