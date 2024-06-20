import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";

import authRouter from "./routers/authRouter";
import conversationRouter from "./routers/conversationRouters";
import userRouter from "./routers/userRouter";
import communityRouter from "./routers/communityRouter";

import readToken from "./middleware/readToken";

// configurations
const root = path.resolve();

dotenv.config(); // get environment variables from .env file
const app = express();

app.use(express.json());
app.use(helmet()); // sets response headers
app.use(cookieParser(), readToken); // parse cookies and read jwt token from jwt cookie
app.use(morgan("common")); // server logger
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/auth", authRouter); // register, login, logout
app.use("/api/conversation", conversationRouter); // start, get conversations and send messages
app.use("/api/user", userRouter); // read, update, delete users
app.use("/api/community", communityRouter); // start communities

app.use("/uploads", express.static(path.join(root, "uploads")));
app.use(express.static(path.join(root, "frontend", "dist")));

const MONGO_URL = process.env.MONGO_URL || console.log("ERROR: No database found");
const PORT = process.env.PORT || console.log("ERROR: No port found");


// start server if connection to database is successful and exit otherwise
if (PORT && MONGO_URL) {
  mongoose
    .connect(MONGO_URL)
    .then(() => app.listen(PORT, () => console.log(`Server started on port: ${PORT}`)))
    .catch((err) => console.log(`ERROR: ${err}`));
}
