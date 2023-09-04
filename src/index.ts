import { server } from "./server/Server";

const port = process.env.PORT;

server.listen(port || 3333, async () => {
  console.log("server running");
});
