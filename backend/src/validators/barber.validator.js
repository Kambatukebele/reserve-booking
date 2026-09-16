import * as z from "zod";

/** |---------- BARBER SCHEMA ----------| */
export const createBarberSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, {
      message:
        "Name can only contain letters, spaces, hyphens, and apostrophes",
    }),
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password must not exceed 32 characters" })
    .refine((val) => /[A-Z]/.test(val), "Must contain an uppercase letter")
    .refine((val) => /[a-z]/.test(val), "Must contain a lowercase letter")
    .refine((val) => /[0-9]/.test(val), "Must contain a number")
    .refine(
      (val) => /[^A-Za-z0-9]/.test(val),
      "Must contain a special character",
    ),
  phone: z.e164({
    message:
      "Please specify a valid phone number (include the international prefix)",
  }),
  bio: z
    .string()
    .min(25, { message: "Bio must be at least 25 characters" })
    .max(120, { message: "Bio must not exceed 120 characters" })
    .optional(),
  photoUrl: z
    .url({
      protocol: /^https$/,
    })
    .optional(),
});

export const updateBarberSchema = z.object({
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
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password must not exceed 32 characters" })
    .refine((val) => /[A-Z]/.test(val), "Must contain an uppercase letter")
    .refine((val) => /[a-z]/.test(val), "Must contain a lowercase letter")
    .refine((val) => /[0-9]/.test(val), "Must contain a number")
    .refine(
      (val) => /[^A-Za-z0-9]/.test(val),
      "Must contain a special character",
    )
    .optional(),
  phone: z
    .e164({
      message:
        "Please specify a valid phone number (include the international prefix)",
    })
    .optional(),
  bio: z
    .string()
    .min(25, { message: "Bio must be at least 25 characters" })
    .max(120, { message: "Bio must not exceed 120 characters" })
    .optional(),
  photoUrl: z
    .url({
      protocol: /^https$/,
    })
    .optional(),
});
