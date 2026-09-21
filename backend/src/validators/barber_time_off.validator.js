import * as z from "zod";

export const createBarberTimeOffSchema = z
  .object({
    startTime: z.iso.datetime({
      message: "Please enter a valid start date and time",
    }),

    endTime: z.iso.datetime({
      message: "Please enter a valid end date and time",
    }),

    reason: z
      .string()
      .min(3, { message: "Reason must be at least 3 characters" })
      .max(255, { message: "Reason cannot exceed 255 characters" })
      .optional(),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: "End time must be after start time",
    path: ["endTime"],
  });

export const updateBarberTimeOffSchema = z
  .object({
    startTime: z.iso
      .datetime({
        message: "Please enter a valid start date and time",
      })
      .optional(),

    endTime: z.iso
      .datetime({
        message: "Please enter a valid end date and time",
      })
      .optional(),

    reason: z
      .string()
      .min(3, { message: "Reason must be at least 3 characters" })
      .max(255, { message: "Reason cannot exceed 255 characters" })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.startTime && data.endTime) {
        return data.endTime > data.startTime;
      }

      return true;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    },
  );
