const router = require('express').Router();
const { createTask, deleteTask, getTask, updateTask } = require("../controllers/task.controllers");

router.get("/", getTask);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;