import  express  from "express";

export const server = express();

server.get('/',(req, res)=>{

res.send('tá indo')

})

