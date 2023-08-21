"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./server/Server");
const port = process.env.PORT;
Server_1.server.listen(port || 3333, () => {
    console.log('server running');
});
