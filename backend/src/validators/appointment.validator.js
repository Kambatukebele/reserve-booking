import * as z from "zod";

export const createAppointmentSchema = z.object({
  customerId: z
    .int({ message: "Customer ID must be an integer" })
    .min(1, { message: "Customer ID can not be empty" }),
  barberId: z
    .int({ message: "Barber ID must be an integer" })
    .min(1, { message: "Barber ID can not be empty" }),
  serviceId: z
    .int({ message: "Service ID must be an integer" })
    .min(1, { message: "Service ID can not be empty" }),
  startTime: z.iso.datetime({
    message: "Please enter a valid date and time (HH:MM or HH:MM:SS)",
  }),
  notes: z.string().optional(),
});
