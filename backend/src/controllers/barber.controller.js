import {
  createBarberSchema,
  updateBarberSchema,
} from "../validators/barber.validator.js";
import {
  createBarberService,
  getAllBarberService,
  getSingleBarberService,
  updateBarberService,
  deactivateSingleBarberService,
} from "../service/barber.service.js";
import * as z from "zod";
import { isValidInteger } from "../utils/validateInteger.js";

export async function create(req, res) {
  try {
    const validatedData = await createBarberSchema.parseAsync(req.body);
    const barber = await createBarberService(validatedData);

    res.status(201).json({
      success: true,
      message: "Barber created successfully!",
      data: barber,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
export async function getAll(req, res) {
  try {
    const barbers = await getAllBarberService();
    return res.status(200).json({
      success: true,
      message: "Barbers retrieved successfully!",
      data: barbers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
export async function getSingle(req, res) {
  try {
    const validatedID = isValidInteger(req.params.id); // return true or false

    if (!validatedID) {
      return res.status(400).json({
        success: false,
        message: "Wrong ID",
      });
    }

    const barber = await getSingleBarberService(Number(req.params.id));

    if (!barber) {
      return res.status(404).json({
        success: false,
        message: "Barber not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service retrieved successfully!",
      data: barber,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
export async function updateSingle(req, res) {
  try {
    const validatedID = isValidInteger(req.params.id); // return true or false

    if (!validatedID) {
      return res.status(400).json({
        success: false,
        message: "Wrong ID",
      });
    }

    const validatedData = await updateBarberSchema.parseAsync(req.body);
    const barber = await updateBarberService(
      Number(req.params.id),
      validatedData,
    );

    res.status(200).json({
      success: true,
      message: "Barber updated successfully!",
      data: barber,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
export async function deactivateSingle(req, res) {
  try {
    /**
     * We are not deleting the barber/user, but turning active to false to follow our business requirements, to preserve historical records.
     */
    const validatedID = isValidInteger(req.params.id);

    if (!validatedID) {
      return res.status(400).json({
        success: false,
        message: "Wrong ID",
      });
    }
    const id = Number(req.params.id); /** Get the id from the req.params */

    await deactivateSingleBarberService(id);

    res.status(200).json({
      success: true,
      message: "Barber deactivated successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
