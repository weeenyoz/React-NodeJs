import express from "express";
import { getAll, register } from "../controllers/teachers";

const router = express.Router();

router.get("/teachers", getAll);
router.post("/register", register);

export default router
