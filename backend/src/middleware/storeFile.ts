import multer from "multer";
import { v4 } from "uuid";
import path from "path";

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

const storeFile = (field: string) => upload.single(field);
export default storeFile;
