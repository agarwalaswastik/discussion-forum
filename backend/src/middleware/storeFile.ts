import multer from "multer";
const upload = multer({ dest: "uploads/", preservePath: true });
const storeFile = (field: string) => upload.single(field);
export default storeFile;
