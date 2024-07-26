const Doc = require("../models/Doc"); // Adjust the path as necessary

exports.getDocLink = async (req, res, next) => {
  try {
    const { uniqueLink } = req.params;
    const doc = await Doc.findOne({ uniqueLink });
    if (doc) {
      return res.status(200).json({ docLink: doc.docLink });
    } else {
      return res.status(404).json({ message: "Link not found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.createDocLink = async (req, res, next) => {
  try {
    const { title, uniqueLink, docLink } = req.body;
    const newDoc = new Doc({ uniqueLink, docLink, title });

    const savedDoc = await newDoc.save();

    return res
      .status(201)
      .json({ message: "Document link created successfully", doc: savedDoc });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Unique link already exists" });
    } else {
      next(error);
    }
  }
};
