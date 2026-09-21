import {
  createBarberScheduleSchema,
  updateBarberScheduleSchema,
} from "../validators/barber_schedule.validator.js";
import {
  createBarberScheduleService,
  getAllBarberScheduleService,
  updateBarberScheduleService,
} from "../service/barber_schedule.service.js";
import * as z from "zod";
import { isValidInteger } from "../utils/validateInteger.js";

export async function create(req, res) {
  try {
    const validatedID = isValidInteger(req.params.id); // return true or false

    if (!validatedID) {
      return res.status(400).json({
        success: false,
        message: "Wrong ID",
      });
    }

    const validatedData = await createBarberScheduleSchema.parseAsync(req.body);
    const barberId = Number(req.params.id);
    const barberSchedule = await createBarberScheduleService(
      barberId,
      validatedData,
    );

    res.status(201).json({
      success: true,
      message: "Barber schedule created successfully!",
      data: barberSchedule,
    });
  } catch (error) {
    const statusCode = error.status || 500;
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    return res.status(statusCode).json({
      success: false,
      message:
        error.statusCode === 409 ? error.message : "Internal server error",
    });
  }
}
export async function getAll(req, res) {
  try {
    const validatedID = isValidInteger(req.params.id); // return true or false

    if (!validatedID) {
      return res.status(400).json({
        success: false,
        message: "Wrong ID",
      });
    }

    const barberId = Number(req.params.id);
    const barberSchedule = await getAllBarberScheduleService(barberId);

    return res.status(200).json({
      success: true,
      message: "Barber Schedules retrieved successfully!",
      data: barberSchedule,
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
    const validatedScheduleId = isValidInteger(req.params.scheduleId); // return true or false

    if (!validatedID) {
      return res.status(400).json({
        success: false,
        message: "Wrong ID",
      });
    }

    if (!validatedScheduleId) {
      return res.status(400).json({
        success: false,
        message: "Wrong Schedule ID",
      });
    }

    const validatedData = await updateBarberScheduleSchema.parseAsync(req.body);

    const barberId = Number(req.params.id);
    const scheduleId = Number(req.params.scheduleId);

    const barberSchedule = await updateBarberScheduleService(
      barberId,
      scheduleId,
      validatedData,
    );

    res.status(201).json({
      success: true,
      message: "Barber schedule updated successfully!",
      data: barberSchedule,
    });
  } catch (error) {
    const statusCode = error.status || 500;
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    return res.status(statusCode).json({
      success: false,
      message:
        error.statusCode === 409 ? error.message : "Internal server error",
    });
  }
}
export async function deleteSingle(req, res) {
  try {
    const validatedID = isValidInteger(req.params.id);
    const validatedScheduleId = isValidInteger(req.params.scheduleId);

    if (!validatedID) {
      return res.status(400).json({
        success: false,
        message: "Wrong ID",
      });
    }

    if (!validatedScheduleId) {
      return res.status(400).json({
        success: false,
        message: "Wrong Schedule ID",
      });
    }

    const barberId = Number(req.params.id);
    const scheduleId = Number(req.params.scheduleId);

    await deleteBarberScheduleService(barberId, scheduleId);

    return res.status(200).json({
      success: true,
      message: "Barber schedule deleted successfully!",
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      success: false,
      message: error.statusCode ? error.message : "Internal server error",
    });
  }
}
