import express from "express";
import * as customerController from "../controllers/customer.controller";

const router = express.Router();

router.post("/customers", customerController.create);
router.get("/customers", customerController.getAll);
router.get("/customers/:id", customerController.getSingle);
router.patch("/customers/:id", customerController.updateSingle);
router.delete("/customers/:id", customerController.deleteSingle);

export default router;
