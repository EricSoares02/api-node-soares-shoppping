import { Request, Response} from 'express'
import { LoginMiddleware } from '../../middleware/auth/login/Login'
import { ILogin } from '../../interfaces/login/ILogin'
import { BadRequest } from '../../middleware/errors.express';
import { ResponseGet } from '../../middleware/Response.express';

class LoginController{


    async make(req: Request<'', '', ILogin>, res: Response){

        const login = await new LoginMiddleware(req.body.password, req.body.email).login();

        if (!login) {
            return new BadRequest('Something Wrong!', res).returnError()
        }

        return new ResponseGet({
            access_token: login
        }).res(res)

    }

}

export { LoginController }