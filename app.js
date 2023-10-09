import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function multerFileParser(file) {
  const buffer = file.buffer;
  const ext = file.mimetype.split("/")[1];
  const sizeInMB = file.size / 1000000;
  const fileName =
    file.originalname.split(".")[0] + new Date().getTime().toString();
  const newGeneratedFileName = fileName + "." + ext;
  const fileLocation = path.join("public", "files",ext==='pdf'?"pdf":"Image");
  if (!fs.existsSync(fileLocation)){
    fs.mkdirSync(fileLocation, { recursive: true });
}
  return { buffer, sizeInMB, fileLocation, ext,newGeneratedFileName};
}

function validateUploadFileFormatAndSize(ext, sizeInMB, res) {
  if (ext === "png" || ext === "jpg" || ext === "jpeg") {
    if (sizeInMB > 5) {
      res.json({ error: true, message: "Image size must be less than 5MB" });
      res.end();
      return true;
    }
  } else if (ext === "pdf") {
    if (sizeInMB > 15) {
      res.json({ error: true, message: "pdf size must be less than 15MB" });
      return true;
    }
  } else {
    res.json({
      error: true,
      message: "Invalid Format only images and pdf are supported",
    });
    return true;
  }
  return false;
}

app.post("/api/uploadFile", multer().single("myFile"), (req, res) => {
  const file = req.file;
  const { buffer, fileLocation, sizeInMB, ext,newGeneratedFileName } = multerFileParser(file);
  if (validateUploadFileFormatAndSize(ext, sizeInMB, res)) {
    return;
  }
  fs.writeFile(path.join(fileLocation,newGeneratedFileName), buffer, (err) => {
    if (err) console.log(err);
  });
  res.json({
    error: false,
    message: "file upload successfully",
  });
  res.end();
});

export default app;
