exports.uploadImg = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res
      .status(200)
      .json({ success: true, message: "File uploaded successfully", url:req.file.path});
  } catch (error) {
    console.log("File not upload: ", error);
    res.status(500).json({message: "Server Error"});
  }
};
