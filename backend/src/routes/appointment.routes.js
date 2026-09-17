import express from "express";
import * as appointment from "../controllers/appointment.controller.js";

const router = express.Router();

router.post("/appointments", appointment.create);
// router.get("/appointments", appointment.getAll);
// router.get("/appointments/:id", appointment.getSingle);

export default router;
