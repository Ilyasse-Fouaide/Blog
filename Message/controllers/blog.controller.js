const { Blog } = require("../models/blog.model");

exports.addblog = async (req, res) => {
  try {

    const { title, desc } = req.body;
    const { filename } = req.file;
    const { destination } = req.file;
    const { id } = req.params;

    const blog = await new Blog({
      title,
      desc,
      image: destination + filename,
      user: id
    });
    blog.save().then(() => {
      res.json("Blog Created Success!.");
    });

  } catch (error) {
    res.json("Someting Went Wrong!." + error);
  }
}

exports.blogs = async (req, res) => {
  try {

    const blogs = await Blog.find().populate("user").sort({ createdAt: -1 });
    res.json(blogs);

  } catch (error) {
    res.json("Someting Went Wrong!." + error);
  }
}

exports.myblog = async (req, res) => {
  try {

    const { id } = req.params;
    const myblogs = await Blog.findById(id).populate("user");
    res.json(myblogs);

  } catch (error) {
    res.json("Someting Went Wrong!." + error);
  }
}

exports.mypost = async (req, res) => {
  try {

    const { id } = req.params;
    const mypost = await Blog.find({ user: id }).populate("user");
    res.json(mypost);

  } catch (error) {
    res.json("Someting Went Wrong!." + error);
  }
}

exports.edit = async (req, res) => {
  try {

    const { id } = req.params;
    const { title, desc } = req.body;
    const { filename } = req.file;
    const { destination } = req.file;

    await Blog.findByIdAndUpdate(
      id,
      { title, desc, image: destination + filename },
      { new: true }
    );

    res.json("updated success");

  } catch (error) {
    res.json("Someting Went Wrong!." + error);
  }
}

exports.delete = async (req, res) => {
  try {

    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.json("deleted success");

  } catch (error) {
    res.json("Someting Went Wrong!." + error);
  }
}
