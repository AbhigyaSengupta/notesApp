import express from "express";
import { dbConnect } from "./src/config/dbConnect.js";
import dotenv from "dotenv";
import userRoute from "./src/routes/userRoute.js";
import noteRoute from "./src/routes/noteRoute.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8002;

dbConnect();

app.use(express.json());
app.use("/user", userRoute);
app.use("/note", noteRoute);

app.listen(port, () => {
  console.log(`Server Started At-${port}`);
});
