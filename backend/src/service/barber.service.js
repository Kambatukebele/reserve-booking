import prisma from "../db/prisma";
import argon2 from "argon2";

export async function createBarberService(body) {
  //Hash password
  const hash = await argon2.hash(body.password);

  const result = await prisma.$transaction(async (tx) => {
    // Create user
    const user = await tx.user.create({
      data: {
        name: body.name,
        email: body.email,
        passwordHash: hash,
        role: "Barber",
      },
    });

    // Create Barber
    const barber = await tx.barber.create({
      data: {
        phone: body.phone,
        bio: body.bio,
        photoUrl: body.photoUrl,
        userId: user.id,
      },
    });
    return {
      user: { name: user.name, email: user.email },
      barber: { phone: barber.phone, bio: barber.bio, userId: barber.userId },
    };
  });
  return result;
}

export async function getAllBarberService() {
  return await prisma.barber.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function getSingleBarberService(id) {
  return await prisma.barber.findUnique({
    where: {
      id: id,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function updateBarberService(id, body) {
  //Hash password
  const barberData = {
    ...(body.phone !== undefined && { phone: body.phone }),
    ...(body.bio !== undefined && { bio: body.bio }),
    ...(body.photoUrl !== undefined && { photoUrl: body.photoUrl }),
  };

  const userData = {
    ...(body.name !== undefined && { name: body.name }),
    ...(body.email !== undefined && { email: body.email }),
  };

  if (body.password !== undefined) {
    userData.passwordHash = await argon2.hash(body.password);
  }

  const result = await prisma.$transaction(async (tx) => {
    // Update Barber
    const barber = await tx.barber.update({
      where: { id },
      data: barberData,
    });

    // Update user
    const user = await tx.user.update({
      where: { id: barber.userId },
      data: userData,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      barber: {
        phone: barber.phone,
        bio: barber.bio,
        userId: barber.userId,
      },
    };
  });
  return result;
}
export async function deactivateSingleBarberService(id) {
  return await prisma.barber.update({
    where: { id },
    data: { active: false },
  });
}
