import express from "express";
import * as serviceController from "../controllers/service.controller.js";

const router = express.Router();

router.post("/services", serviceController.create);
router.get("/services", serviceController.getAll);
router.get("/services/:id", serviceController.getSingle);
router.patch("/services/:id", serviceController.updateSingle);
router.delete("/services/:id", serviceController.deactivateSingle);

export default router;
