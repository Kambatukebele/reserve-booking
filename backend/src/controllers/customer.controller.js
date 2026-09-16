import {
  createCustomerSchema,
  updateCustomerSchema,
} from "../validators/customer.validator.js";
import {
  createCustomerService,
  getAllCustomerService,
  getSingleCustomer,
  updateCustomerService,
  deleteCustomerService,
} from "../service/customer.service.js";
import { isValidInteger } from "../utils/validateInteger.js";
import * as z from "zod";

export async function create(req, res) {
  try {
    const validatedData = await createCustomerSchema.parseAsync(req.body);

    const customer = await createCustomerService(validatedData);

    res.status(201).json({
      success: true,
      message: "Customer created successfully!",
      data: customer,
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
    const customers = await getAllCustomerService();

    return res.status(200).json({
      success: true,
      message: "Customers retrieved successfully!",
      data: customers,
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

    const customer = await getSingleCustomer(Number(req.params.id));

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer retrieved successfully!",
      data: customer,
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

    const validatedData = await updateCustomerSchema.parseAsync(req.body);

    const customer = await updateCustomerService(
      Number(req.params.id),
      validatedData,
    );

    res.status(200).json({
      success: true,
      message: "Customer updated successfully!",
      data: customer,
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
export async function deleteSingle(req, res) {
  try {
    const validatedID = isValidInteger(req.params.id);

    if (!validatedID) {
      return res.status(400).json({
        success: false,
        message: "Wrong ID",
      });
    }
    const id = Number(req.params.id); /** Get the id from the req.params */

    await deleteCustomerService(id);

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
