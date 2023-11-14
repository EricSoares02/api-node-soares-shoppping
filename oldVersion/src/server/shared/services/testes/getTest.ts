// import connect from "../../../database";
// import { prisma } from "../prisma/prisma";

// export const getAllPost = async () => {
//   try {
//     connect();
//     const posts = await prisma.post.findMany();
//     return posts;
//   } catch (error) {
//      console.log(`error:${error}`);
//   } finally {
//      await prisma.$disconnect();
//   }
// };
