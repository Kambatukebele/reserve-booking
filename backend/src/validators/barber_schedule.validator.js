import * as z from "zod";

export const createBarberScheduleSchema = z
  .object({
    dayOfWeek: z
      .int({ message: "Day of week  must be an integer" })
      .min(1)
      .max(7),
    startTime: z.iso.time({
      message: "Please enter a valid time",
    }),
    endTime: z.iso.time({
      message: "Please enter a valid time",
    }),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: "End time must be after start time",
    path: ["endTime"],
  });

export const updateBarberScheduleSchema = z
  .object({
    dayOfWeek: z
      .int({ message: "Day of week  must be an integer" })
      .min(1)
      .max(7)
      .optional(),
    startTime: z.iso
      .time({
        message: "Please enter a valid time",
      })
      .optional(),
    endTime: z.iso
      .time({
        message: "Please enter a valid time",
      })
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
