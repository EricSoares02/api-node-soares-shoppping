import { prisma } from "../services/prisma/prisma";


  async function connect() {
    try {
      await prisma.$connect();
      console.log('Database connected sucess')
    } catch (error) {
      console.log("Database connected unsucessull");
    }
  }

 async function diconnect(){
  try {
    await prisma.$disconnect();
    console.log('Database disconnected sucess')
  } catch (error) {
    console.log("Database disconnected unsucessull");
  }
}


export {connect, diconnect}