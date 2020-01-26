import express from "express";
import { getAll, register, getCommonStudents } from "../controllers/teachers";

const router = express.Router();

router.get("/teachers", getAll);
router.post("/register", register);
router.get("/commonstudents", getCommonStudents)

export default router
