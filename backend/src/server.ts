import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import authRouter from "./routers/authRouter";
import conversationRouter from "./routers/conversationRouters";

import readToken from "./middleware/readToken";

// configurations

dotenv.config(); // get environment variables from .env file
const app = express();

app.use(express.json());
app.use(helmet()); // sets response headers
app.use(cookieParser(), readToken); // parse cookies and read jwt token from jwt cookie
app.use(morgan("common")); // server logger
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/auth", authRouter); // register, login, logout
app.use("/conversation", conversationRouter); // start conversation, get conversations, send message

const MONGO_URL = process.env.MONGO_URL || console.log("ERROR: No database found");
const PORT = process.env.PORT || console.log("ERROR: No port found");


// start server if connection to database is successful and exit otherwise
if (PORT && MONGO_URL) {
  mongoose
    .connect(MONGO_URL)
    .then(() => app.listen(PORT, () => console.log(`Server started on port: ${PORT}`)))
    .catch((err) => console.log(`ERROR: ${err}`));
}
