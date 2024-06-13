import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import authRouter from "./routers/authRouter";

/* Configurations */
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/auth", authRouter);

const MONGO_URL = process.env.MONGO_URL || console.log("ERROR: No database found");
const PORT = process.env.PORT || console.log("ERROR: No port found");

if (PORT && MONGO_URL) {
  mongoose
    .connect(MONGO_URL)
    .then(() => app.listen(PORT, () => console.log(`Server started on port: ${PORT}`)))
    .catch((err) => console.log(`ERROR: ${err}`));
}
