const Doc = require("../models/Doc"); // Adjust the path as necessary

exports.getDocLink = async (req, res, next) => {
  try {
    const { uniqueLink } = req.params;
    const doc = await Doc.findOne({ uniqueLink });
    if (doc) {
      return res.status(200).json({ doc: doc });
    } else {
      return res.status(404).json({ message: "Link not found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.createDocLink = async (req, res, next) => {
  try {
    const { title, uniqueLink, docLink,newLink } = req.body;
    const newDoc = new Doc({ uniqueLink, docLink, title,newLink });
    const savedDoc = await newDoc.save();
    console.log(savedDoc);
    return res
      .status(200)
      .json({ message: "Document link created successfully", doc: savedDoc });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Unique link already exists" });
    } else {
      next(error);
    }
  }
};

exports.getAllDocs = async (req, res) => {
  try {
    const links = await Doc.find();
    if (!links || links.length === 0) {
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

exports.deleteDocById = async (req, res, next) => {
  const { id } = req.body;
    console.log("hi")
    console.log(req.body)

    console.log(id)
  try {
   
    const doc = await Doc.findByIdAndDelete( id);
    if (doc) {
      return res.status(200).json({ message: "Document deleted successfully" });
    } else {
      return res.status(404).json({ message: "Document not found" });
    }
  } catch (error) {
    console.log(error)
    next(error);
  }
};

