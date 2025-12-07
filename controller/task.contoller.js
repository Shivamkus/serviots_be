const taskModel = require("../models/tastModel");

exports.creatTask = async (req, res) => {
  try {
    const { title, description , status} = req.body;

    if (!title || !description) {
      return res
        .status(404)
        .json({ message: "title and description are Required Field" });
    }

    const user = req.user;

    console.log("userid", user.id);

    const newTask = await taskModel.create({
      title,
      status,
      description,
      userId: user.id,
    });

    return res.status(201).json({
      message: "New Task Created Successfully",
      newTask,
    });
  } catch (error) {
    console.log("error on create task", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getTask = async (req, res) => {
  try {
    const user = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchQuery = req.query.searchTerm?.trim() || "";

    let query = {
      userId: user.id,
      isDeleted: false
    };

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } }
      ];
    }

    const getTasks = await taskModel
      .find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const totalItems = await taskModel.countDocuments(query);

    return res.status(200).json({
      message: "Get All Task Successfully",
      data: getTasks,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      page,
      pageSize: limit
    });

  } catch (error) {
    console.log("Error on Getting Task", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.UpdateTasks = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;
    const { title, description, status } = req.body;

    const UpdateTask = await taskModel.findOneAndUpdate(
      {
        _id: id,
        userId: user.id,
        isDeleted: false,
      },
      {
        title,
        description,
        status,
      },
      { new: true }
    );

    if (!UpdateTask) {
      return res.status(404).json({ message: `Not Task Update For This User` });
    }

    return res.status(200).json({
      message: "Task Update Successfully",
      data: UpdateTask,
    });
  } catch (error) {
    console.log("error on Update Task", error.message);
    return res.status(500).json({ message: "Internals Server Error" });
  }
};

exports.deleteTasks = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;

    const deleteTask = await taskModel.findOneAndUpdate(
      {
        _id: id,
        userId: user.id,
        isDeleted: false,
      },
      {
        isDeleted: true,
      },
      { new: true }
    );

    if (!deleteTask) {
      return res.status(404).json({ message: `Not Task Delete For This User` });
    }

    return res.status(200).json({
      message: "Task Deleted Successfully",
      //   data: deleteTask,
    });
  } catch (error) {
    console.log("error on Delete Task", error.message);
    return res.status(500).json({ message: "Internals Server Error" });
  }
};
