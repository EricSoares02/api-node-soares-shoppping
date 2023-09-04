import { prisma } from "../shared/services/prisma/prisma";


export default async function connect() {
    try {
      await prisma.$connect();
      console.log('Database connected sucess')
    } catch (error) {
      console.log("Database connected unsucessull");
    }
  }