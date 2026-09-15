import {
  getAllServices,
  createService,
  getSingleService,
  updateService,
  deactivateService,
} from "../service/service.service";
import {
  createServiceSchema,
  updateServiceSchema,
} from "../validators/service.validator.js";
import * as z from "zod";
import { isValidInteger } from "../utils/validateInteger.js";

export async function create(req, res) {
  try {
    const validatedData = await createServiceSchema.parseAsync(req.body);

    const service = await createService(validatedData);

    res.status(201).json({
      success: true,
      message: "Service created successfully!",
      data: service,
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
    const services = await getAllServices();

    return res.status(200).json({
      success: true,
      message: "Services retrieved successfully!",
      data: services,
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

    const service = await getSingleService(Number(req.params.id));

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service retrieved successfully!",
      data: service,
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

    const validatedData = await updateServiceSchema.parseAsync(req.body);

    const service = await updateService(Number(req.params.id), validatedData);

    res.status(200).json({
      success: true,
      message: "Service updated successfully!",
      data: service,
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
     * We are not deleting the service, but turning active to false to follow our business requirements, to preserve historical records.
     */
    const validatedID = isValidInteger(req.params.id);

    if (!validatedID) {
      return res.status(400).json({
        success: false,
        message: "Wrong ID",
      });
    }
    const id = Number(req.params.id); /** Get the id from the req.params */

    await deactivateService(id);

    res.status(200).json({
      success: true,
      message: "Service deactivated successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
