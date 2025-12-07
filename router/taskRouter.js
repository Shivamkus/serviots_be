const express = require('express');
const router = express.Router();
const taskcontroller = require('../controller/task.contoller')


router.post('/',  taskcontroller.creatTask)
router.get('/', taskcontroller.getTask)
router.put('/:id', taskcontroller.UpdateTasks)
router.delete('/:id', taskcontroller.deleteTasks)


module.exports = router;