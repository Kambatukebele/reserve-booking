import * as z from "zod";

/** |---------- CUSTOMER SCHEMA ----------| */
export const createCustomerSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters long" })
    .max(20, { message: "Name cannot exceed 50 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, {
      message:
        "Name can only contain letters, spaces, hyphens, and apostrophes",
    }),
  email: z.email(),
  phone: z.e164({
    message:
      "Please specify a valid phone number (include the international prefix)",
  }),
});

export const updateCustomerSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, {
      message:
        "Name can only contain letters, spaces, hyphens, and apostrophes",
    })
    .optional(),
  email: z.email().optional(),
  phone: z
    .e164({
      message:
        "Please specify a valid phone number (include the international prefix)",
    })
    .optional(),
});
