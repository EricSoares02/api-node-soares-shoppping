import connect from "../../../database";
import { prisma } from "../prisma/prisma";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SearchProducts = async (value: any) => {
  try {
    connect();
    const result = await prisma.product.findMany({
      where: {
        name: {
          contains: value,
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};
