import express from "express";
import * as barberController from "../controllers/barber.controller.js";

const router = express.Router();

router.post("/barbers", barberController.create);
router.get("/barbers", barberController.getAll);
router.get("/barbers/:id", barberController.getSingle);
router.patch("/barbers/:id", barberController.updateSingle);
router.delete("/barbers/:id", barberController.deactivateSingle);

export default router;
