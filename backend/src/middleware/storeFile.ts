import multer from "multer";
import { v4 } from "uuid";
import path from "path";

// use disk storage to store uploaded files
// destination folder: uploads/
// filename: <random uuid><extension>
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads/");
  },
  filename: function (_req, file, cb) {
    const name = v4();
    const ext = path.extname(file.originalname);
    cb(null, `${name}${ext}`);
  },
});

const upload = multer({ storage });

// this middleware creator returns middleware that takes file from a form input with specified
// name and stores it in disk storage as specified above 
const storeFile = (field: string) => upload.single(field);
export default storeFile;
