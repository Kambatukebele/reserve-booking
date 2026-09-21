import express from "express";

import * as barberTimeOff from "../controllers/barber_time_off.controller.js";

const router = express.Router();

router.post("/barbers/:id/time-off", barberTimeOff.create);

router.get("/barbers/:id/time-off", barberTimeOff.getAll);

router.patch("/barbers/:id/time-off/:timeOffId", barberTimeOff.updateSingle);

router.delete("/barbers/:id/time-off/:timeOffId", barberTimeOff.deleteSingle);

export default router;
