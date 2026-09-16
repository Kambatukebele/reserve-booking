import prisma from "../db/prisma";

export async function createCustomerService(body) {
  const customer = await prisma.customer.create({
    data: body,
  });
  return customer;
}

export async function getAllCustomerService() {
  return await prisma.customer.findMany();
}

export async function getSingleCustomer(id) {
  return await prisma.customer.findUnique({
    where: {
      id: id,
    },
  });
}

export async function updateCustomerService(id, data) {
  return await prisma.customer.update({
    where: {
      id: id,
    },
    data: data,
  });
}

export async function deleteCustomerService(id) {
  return await prisma.customer.delete({
    where: {
      id: id,
    },
  });
}
