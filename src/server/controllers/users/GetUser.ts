import { NextFunction, Response, Request } from "express"
import { Authorization } from "../../shared/middleware/Authorization"
import { getUserService } from "../../shared/services/user/getUser"


export const getUser = async (req: Request, res: Response, next:NextFunction) => {

    const {authorization} = req.headers 
    const id = req.body.id
    const pass = authorization || ''
    Authorization(pass, res, next)
    getUserService(id,res)
}