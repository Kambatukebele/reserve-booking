import express from "express";
import * as barberSchedule from "../controllers/barber_schedule.controller.js";

const router = express.Router();

router.post("/barbers/:id/schedule", barberSchedule.create);
router.get("/barbers/:id/schedule", barberSchedule.getAll);
router.patch("/barbers/:id/schedule/:scheduleId", barberSchedule.updateSingle);
router.delete("/barbers/:id/schedule/:scheduleId", barberSchedule.deleteSingle);

export default router;
