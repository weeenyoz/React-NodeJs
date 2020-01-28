import express from "express";
import { getStudents, getStudent } from "../controllers/student";

const router = express.Router();

router.get("/", getStudents);
router.get("/:id", getStudent);


export default router
