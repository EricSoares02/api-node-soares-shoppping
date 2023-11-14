import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../../../shared/services/prisma/prisma'
import connect from '../../../database'
import bcrypt from "bcrypt"

export const login = async (req: Request, res: Response) => {

const {email, password} = req.body

try {
    connect();
    const userExist = await prisma.user.findUnique({ where: {email:email} });
 
    if (!userExist) {
       throw res.json({message:"this user email dont exist"})
    }
    const verifyPass = bcrypt.compare(password, userExist.password)
    
    if (!verifyPass) {
        throw res.json({message:"this user password dont exist"})
     }

     const token = jwt.sign({id: userExist.id}, process.env.JWT_PASS ?? '', {expiresIn: '1h'})

     res.json({user: {id:userExist.id, url_img:userExist.url_img}, token: token})
  } catch (error) {
    console.log(`error:${error}`);
  } finally {
    await prisma.$disconnect();
  }

}