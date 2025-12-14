import express from "express";
import {
  createTodo,
  getAllTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/notesController.js";
import { hasToken } from "../middleware/hasToken.js";
import { NoteValidateSchema, validateNote } from "../validator/noteValidate.js";

const noteRoute = express.Router();

noteRoute.post("/create", hasToken, validateNote(NoteValidateSchema), createTodo);
// noteRoute.post("/create", hasToken, createTodo);
noteRoute.get("/getAll", hasToken, getAllTodo);
noteRoute.put("/update/:id", hasToken, updateTodo);
noteRoute.delete("/delete/:id", hasToken, deleteTodo);

export default noteRoute;
