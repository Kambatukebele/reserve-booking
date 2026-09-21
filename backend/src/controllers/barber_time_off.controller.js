import * as z from "zod";

import {
  createBarberTimeOffSchema,
  updateBarberTimeOffSchema,
} from "../validators/barber_time_off.validator.js";

import {
  createBarberTimeOffService,
  getAllBarberTimeOffService,
  updateBarberTimeOffService,
  deleteBarberTimeOffService,
} from "../service/barber_time_off.service.js";

import { isValidInteger } from "../utils/validateInteger.js";

export async function create(req, res) {
  try {
    const validatedID = isValidInteger(req.params.id);

    if (!validatedID) {
      return res.status(400).json({
        success: false,
        message: "Wrong ID",
      });
    }

    const validatedData = await createBarberTimeOffSchema.parseAsync(req.body);

    const barberId = Number(req.params.id);

    const timeOff = await createBarberTimeOffService(barberId, validatedData);

    return res.status(201).json({
      success: true,
      message: "Barber time off created successfully!",
      data: timeOff,
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

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      success: false,
      message: error.statusCode ? error.message : "Internal server error",
    });
  }
}

export async function getAll(req, res) {
  try {
    const validatedID = isValidInteger(req.params.id);

    if (!validatedID) {
      return res.status(400).json({
        success: false,
        message: "Wrong ID",
      });
    }

    const barberId = Number(req.params.id);

    const timeOff = await getAllBarberTimeOffService(barberId);

    return res.status(200).json({
      success: true,
      data: timeOff,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      success: false,
      message: error.statusCode ? error.message : "Internal server error",
    });
  }
}

export async function updateSingle(req, res) {
  try {
    const validatedID = isValidInteger(req.params.id);
    const validatedTimeOffId = isValidInteger(req.params.timeOffId);

    if (!validatedID) {
      return res.status(400).json({
        success: false,
        message: "Wrong ID",
      });
    }

    if (!validatedTimeOffId) {
      return res.status(400).json({
        success: false,
        message: "Wrong Time Off ID",
      });
    }

    const validatedData = await updateBarberTimeOffSchema.parseAsync(req.body);

    const barberId = Number(req.params.id);
    const timeOffId = Number(req.params.timeOffId);

    const timeOff = await updateBarberTimeOffService(
      barberId,
      timeOffId,
      validatedData,
    );

    return res.status(200).json({
      success: true,
      message: "Barber time off updated successfully!",
      data: timeOff,
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

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      success: false,
      message: error.statusCode ? error.message : "Internal server error",
    });
  }
}

export async function deleteSingle(req, res) {
  try {
    const validatedID = isValidInteger(req.params.id);
    const validatedTimeOffId = isValidInteger(req.params.timeOffId);

    if (!validatedID) {
      return res.status(400).json({
        success: false,
        message: "Wrong ID",
      });
    }

    if (!validatedTimeOffId) {
      return res.status(400).json({
        success: false,
        message: "Wrong Time Off ID",
      });
    }

    const barberId = Number(req.params.id);
    const timeOffId = Number(req.params.timeOffId);

    await deleteBarberTimeOffService(barberId, timeOffId);

    return res.status(200).json({
      success: true,
      message: "Barber time off deleted successfully!",
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      success: false,
      message: error.statusCode ? error.message : "Internal server error",
    });
  }
}
