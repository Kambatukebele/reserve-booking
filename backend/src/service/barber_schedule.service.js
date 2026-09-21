import prisma from "../db/prisma";

export async function createBarberScheduleService(id, body) {
  // fetch the corresponding barber id
  const barber = await prisma.barber.findUnique({
    where: { id, active: true },
  });

  //check if barber exist
  if (barber === null) return;

  // get existing schedules for that barber/day
  const existingSchedules = await prisma.barberSchedule.findMany({
    where: {
      barberId: id,
      dayOfWeek: body.dayOfWeek,
    },
  });

  // check for overlapping schedules
  const hasOverlap = existingSchedules.some((schedule) => {
    return (
      body.startTime < schedule.endTime && body.endTime > schedule.startTime
    );
  });

  if (hasOverlap) {
    const error = new Error("Barber already has a schedule during this time");
    error.statusCode = 409;
    throw error;
  }

  const createBarberSchedule = await prisma.barberSchedule.create({
    data: {
      barberId: id,
      dayOfWeek: body.dayOfWeek,
      startTime: body.startTime,
      endTime: body.endTime,
    },
  });
  return createBarberSchedule;
}

export async function getAllBarberScheduleService(id) {
  // fetch the corresponding barber id
  const barber = await prisma.barber.findUnique({
    where: { id, active: true },
  });

  //check if barber exist
  if (barber === null) return;
  return await prisma.barberSchedule.findMany({
    where: {
      barberId: barber.id,
    },
  });
}

export async function updateBarberScheduleService(id, scheduleId, body) {
  // Check barber exists and is active
  const barber = await prisma.barber.findUnique({
    where: {
      id,
      active: true,
    },
  });

  if (barber === null) {
    const error = new Error("Barber not found or inactive");
    error.statusCode = 404;
    throw error;
  }

  // Get the existing schedule
  const existingSchedule = await prisma.barberSchedule.findFirst({
    where: {
      id: scheduleId,
      barberId: id,
    },
  });

  if (existingSchedule === null) {
    const error = new Error("Barber schedule not found");
    error.statusCode = 404;
    throw error;
  }

  // Merge existing values with new values
  const updatedDayOfWeek = body.dayOfWeek ?? existingSchedule.dayOfWeek;
  const updatedStartTime = body.startTime ?? existingSchedule.startTime;
  const updatedEndTime = body.endTime ?? existingSchedule.endTime;

  // Validate final time range
  if (updatedEndTime <= updatedStartTime) {
    const error = new Error("End time must be after start time");
    error.statusCode = 400;
    throw error;
  }

  // Get other schedules for the same barber/day
  const existingSchedules = await prisma.barberSchedule.findMany({
    where: {
      barberId: id,
      dayOfWeek: updatedDayOfWeek,
      NOT: {
        id: scheduleId,
      },
    },
  });

  // Check for overlapping schedules
  const hasOverlap = existingSchedules.some((schedule) => {
    return (
      updatedStartTime < schedule.endTime && updatedEndTime > schedule.startTime
    );
  });

  if (hasOverlap) {
    const error = new Error("Barber already has a schedule during this time");
    error.statusCode = 409;
    throw error;
  }

  // Update schedule
  return await prisma.barberSchedule.update({
    where: {
      id: scheduleId,
    },
    data: {
      dayOfWeek: updatedDayOfWeek,
      startTime: updatedStartTime,
      endTime: updatedEndTime,
    },
  });
}

export async function deleteBarberScheduleService(id, scheduleId) {
  // Check barber exists and is active
  const barber = await prisma.barber.findUnique({
    where: {
      id,
      active: true,
    },
  });

  if (barber === null) {
    const error = new Error("Barber not found or inactive");
    error.statusCode = 404;
    throw error;
  }

  // Check schedule belongs to this barber
  const schedule = await prisma.barberSchedule.findFirst({
    where: {
      id: scheduleId,
      barberId: id,
    },
  });

  if (schedule === null) {
    const error = new Error("Barber schedule not found");
    error.statusCode = 404;
    throw error;
  }

  // Delete schedule
  await prisma.barberSchedule.delete({
    where: {
      id: scheduleId,
    },
  });
}
