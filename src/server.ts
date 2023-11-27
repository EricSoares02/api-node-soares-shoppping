import express from "express";
import cors from "cors"
import "dotenv/config";
import { router } from "./router/routers";


const server = express();
server.use(cors())
server.use(express.json());
server.use(router);

server.listen(process.env.PORT || 3333, async () => {
    console.log("server running");
    console.log(`listening port ${process.env.PORT}`);
  });
  
export {server}