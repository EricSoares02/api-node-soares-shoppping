import { Request, Response } from "express";
import { ElderService } from "../../services/elder/ElderService";
import { ElderRepository } from "../../repositories/elder/ElderRepository";
import { Elder } from "../../interfaces/elder/elder";
import { BadRequest } from "../../middleware/errors.express";
import { ResponseGet, ResponseToCreated } from "../../middleware/Response.express";
import { IElderParams } from "../../interfaces/elder/elder.repository";


class ElderController {


async create(req: Request<'', '', Elder>, res: Response){

        const elder = await new ElderService(new ElderRepository()).executeCreate(req.body)

        if (!elder) {
            return new BadRequest('Something Is Wrong!',res).returnError()
        }
        return new ResponseToCreated(elder).res(res)

}


async update(req: Request<'', '', Elder>, res: Response){

    const elder = await new ElderService(new ElderRepository()).executeUpdate(req.body)

    if (!elder) {
        return new BadRequest('Something Is Wrong!',res).returnError()
    }
    return new ResponseToCreated(elder).res(res)

}

async get(req: Request<IElderParams>, res: Response){

    const elder = await new ElderService(new ElderRepository()).executeGet(req.params.id);

    if (!elder) {
        return new BadRequest('This Elder Does Not Exist!',res).returnError()
    }
    return new ResponseGet(elder).res(res);

}

async getByEmail(req: Request<IElderParams>, res: Response){

    const elder = await new ElderService(new ElderRepository()).executeGetByEmail(req.params.email);

    if (!elder) {
        return new BadRequest('This Elder Does Not Exist!',res).returnError()
    }
    return new ResponseGet(elder).res(res);

}


async delete(req: Request<IElderParams>){

     await new ElderService(new ElderRepository()).executeDelete(req.params.id);

}

}

export {ElderController}