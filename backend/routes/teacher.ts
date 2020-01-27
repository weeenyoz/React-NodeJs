import express from "express";
import { getAll, register, getCommonStudents, suspendStudent } from "../controllers/teachers";

const router = express.Router();

router.get("/teachers", getAll);
router.post("/register", register);
router.get("/commonstudents", getCommonStudents)
router.post("/suspend", suspendStudent)

export default router
