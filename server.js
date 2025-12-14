import express from "express";
import { dbConnect } from "./src/config/dbConnect.js";
import dotenv from "dotenv";
import userRoute from "./src/routes/userRoute.js";
import noteRoute from "./src/routes/noteRoute.js";
import multerRoute from "./src/routes/multerRoute.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 8002;

dbConnect();

app.use(express.json());
app.use("/upload", express.static("upload"))

app.use("/user", userRoute);
app.use("/note", noteRoute);
app.use("/picture", multerRoute)

app.listen(port, () => {
  console.log(`Server Started At-${port}`);
});
