import prisma from "../db/prisma";

export async function createBarberTimeOffService(id, body) {
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

  const startTime = new Date(body.startTime);
  const endTime = new Date(body.endTime);

  // Check overlapping time off
  const existingTimeOff = await prisma.barberTimeOff.findMany({
    where: {
      barberId: id,
    },
  });

  const hasOverlap = existingTimeOff.some((timeOff) => {
    return startTime < timeOff.endTime && endTime > timeOff.startTime;
  });

  if (hasOverlap) {
    const error = new Error("Barber already has time off during this period");
    error.statusCode = 409;
    throw error;
  }

  return await prisma.barberTimeOff.create({
    data: {
      barberId: id,
      startTime,
      endTime,
      reason: body.reason,
    },
  });
}

export async function getAllBarberTimeOffService(id) {
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

  return await prisma.barberTimeOff.findMany({
    where: {
      barberId: id,
    },
    orderBy: {
      startTime: "asc",
    },
  });
}

export async function updateBarberTimeOffService(id, timeOffId, body) {
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

  // Find existing time off belonging to this barber
  const existingTimeOff = await prisma.barberTimeOff.findFirst({
    where: {
      id: timeOffId,
      barberId: id,
    },
  });

  if (existingTimeOff === null) {
    const error = new Error("Barber time off not found");
    error.statusCode = 404;
    throw error;
  }

  // Merge existing values with new values
  const updatedStartTime = body.startTime
    ? new Date(body.startTime)
    : existingTimeOff.startTime;

  const updatedEndTime = body.endTime
    ? new Date(body.endTime)
    : existingTimeOff.endTime;

  // Validate final time range
  if (updatedEndTime <= updatedStartTime) {
    const error = new Error("End time must be after start time");
    error.statusCode = 400;
    throw error;
  }

  // Get other time-off periods
  const otherTimeOff = await prisma.barberTimeOff.findMany({
    where: {
      barberId: id,
      NOT: {
        id: timeOffId,
      },
    },
  });

  // Check for overlap
  const hasOverlap = otherTimeOff.some((timeOff) => {
    return (
      updatedStartTime < timeOff.endTime && updatedEndTime > timeOff.startTime
    );
  });

  if (hasOverlap) {
    const error = new Error("Barber already has time off during this period");
    error.statusCode = 409;
    throw error;
  }

  return await prisma.barberTimeOff.update({
    where: {
      id: timeOffId,
    },
    data: {
      startTime: updatedStartTime,
      endTime: updatedEndTime,
      reason: body.reason,
    },
  });
}

export async function deleteBarberTimeOffService(id, timeOffId) {
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

  // Check time off belongs to barber
  const timeOff = await prisma.barberTimeOff.findFirst({
    where: {
      id: timeOffId,
      barberId: id,
    },
  });

  if (timeOff === null) {
    const error = new Error("Barber time off not found");
    error.statusCode = 404;
    throw error;
  }

  await prisma.barberTimeOff.delete({
    where: {
      id: timeOffId,
    },
  });
}
