import { createAppointmentSchema } from "../validators/appointment.validator.js";
import { createAppointmentService } from "../service/appointment.service.js";
import * as z from "zod";

export async function create(req, res) {
  try {
    const validatedData = await createAppointmentSchema.parseAsync(req.body);
    const appointment = await createAppointmentService(validatedData);

    res.status(201).json({
      success: true,
      message: "appointment created successfully!",
      data: appointment,
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

// export async function getAll(req, res) {}

// export async function getSingle(req, res) {}
