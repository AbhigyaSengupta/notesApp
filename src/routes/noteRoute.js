import express from "express";
import {
  createTodo,
  getAllTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/notesController.js";
import { hasToken } from "../middleware/hasToken.js";
// import { NoteValidateSchema, validateNote } from "../validator/noteValidate.js";

const noteRoute = express.Router();

// noteRoute.post("/create", hasToken, validateNote(NoteValidateSchema), createTodo);
noteRoute.post("/create", hasToken, createTodo);
noteRoute.get("/getAll", getAllTodo);
noteRoute.put("/update/:id", updateTodo);
noteRoute.delete("/delete/:id", deleteTodo);

export default noteRoute;
