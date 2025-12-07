const express = require("express");
const router = express.Router();
const UserRouter = require("../router/userRouter");
const TaskRouter = require("../router/taskRouter");
const middleware = require('../middleware/authMiddleware')


router.use("/auth", UserRouter);
router.use("/tasks", middleware.protected, TaskRouter);


module.exports = router;
