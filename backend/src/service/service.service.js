import prisma from "../db/prisma";

export async function createService(body) {
  const service = await prisma.service.create({
    data: body,
  });
  return service;
}

export async function getAllServices() {
  return await prisma.service.findMany();
}

export async function getSingleService(id) {
  return await prisma.service.findUnique({
    where: {
      id: id,
    },
  });
}

export async function updateService(id, data) {
  return await prisma.service.update({
    where: {
      id: id,
    },
    data: data,
  });
}

export async function deactivateService(id) {
  return await prisma.service.update({
    where: {
      id: id,
    },
    data: { active: false },
  });
}
