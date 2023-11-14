import { Request, Response } from "express";
import { IUser } from "../../shared/model/user/User";
import { CreateUserMiddleware } from "../../shared/middleware/user/create/CreateUser";
import bcrypt from 'bcrypt'
export const create = async (req:Request<'','',IUser>, res:Response) => {

const {id,first_name, last_name, url_img, email,password} = req.body;

const hashPassword = await bcrypt.hash(password, 10);

const newUser = {
    id: id,
    first_name: first_name,
    last_name: last_name,
    url_img: url_img,
    email: email,
    password: hashPassword
}

CreateUserMiddleware(newUser, res)
    
}