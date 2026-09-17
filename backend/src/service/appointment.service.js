import prisma from "../db/prisma";

export async function createAppointmentService(body) {
  /**
   * 1. Receive the validated data
   * 2. check that the customer exists
   * 3. check that the barber exists and is Active
   * 4. check that the service exist and is active
   * 5. get the service's duration
   * 6. calculate endTime
   * 7. Create the appointment with:
   *    customerId,
   *    barberId,
   *    serviceId,
   *    startTime,
   *    Calculated endTime,
   *    status: pending,
   *    notes
   */

  const validated = body;

  const checkIfCustomerExists = await prisma.customer.findUnique({
    where: { id: validated.customerId },
  });
  if (checkIfCustomerExists === null) return;

  const checkIfBarberExistsAndActive = await prisma.barber.findUnique({
    where: { id: validated.barberId, active: true },
  });
  if (checkIfBarberExistsAndActive === null) return;

  const checkIfServiceExistsAndActive = await prisma.service.findUnique({
    where: { id: validated.serviceId, active: true },
  });
  if (checkIfServiceExistsAndActive === null) return;

  const START_TIME = new Date(validated.startTime);

  const END_TIME = new Date(
    START_TIME.getTime() + checkIfServiceExistsAndActive.duration * 60 * 1000,
  );

  const appointment = await prisma.appointment.create({
    data: {
      customerId: validated.customerId,
      barberId: validated.barberId,
      serviceId: validated.serviceId,
      startTime: START_TIME,
      endTime: END_TIME,
      notes: validated.notes,
    },
  });
  return appointment;
}

// export async function getAllAppointmentService() {}

// export async function getSingleAppointmentService() {}
