const Link = require("../models/Link");

exports.createLink = async (req, res, next) => {
  try {
    const { title, link } = req.body;
    const newLink = new Link({ title, link });

    const savedLink = await newLink.save();

    return res
      .status(201)
      .json({ message: "Document link created successfully", link: savedLink });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Unique link already exists" });
    } else {
      next(error);
    }
  }
};

exports.getAllLinks = async (req, res) => {
  try {
    const { links } = await Link.find();
    if (!links) {
      return res.status(404).send({
        message: "Links not found",
        success: false,
      });
    }
    return res.status(200).send({
      success: true,
      message: "Links Data",
      links,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Unique link already exists" });
    } else {
      next(error);
    }
  }
};
