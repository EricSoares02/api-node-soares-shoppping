import connect from "../../../oldVersion/src/server/database"
import { diconnect } from "../../database/database"
import { prisma } from "../../services/prisma/prisma"

async function verifyUser(userId: string){

connect()
const user = await prisma.user.findUnique({
    where:{ id: userId}
}).finally( await diconnect )

return user

}

export {verifyUser}