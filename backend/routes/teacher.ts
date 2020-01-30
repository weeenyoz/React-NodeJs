import express from "express";
import { getTeachers, getTeacher, register, getCommonStudents, suspendStudent, retrieveNotifications } from "../controllers/teacher";

const router = express.Router();

router.get("/teachers", getTeachers);
router.get("/teachers/:id", getTeacher);
router.post("/register", register);
router.get("/commonstudents", getCommonStudents);
router.post("/suspend", suspendStudent);
router.post("/retrievefornotifications", retrieveNotifications);

export default router
