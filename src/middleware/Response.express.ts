import { Response } from "express";

class ResponseExpress{

constructor(protected T: any){
this.T
}

public res(res:Response){
res.status(201).json({message:this.T})
}

}

class ResponseToCreated extends ResponseExpress{

    
    public res(res: Response<any, Record<string, any>>) {
        return res.status(201).json({message:'successful',created: this.T})  
    }
}


class ResponseGet extends ResponseExpress{

    
    public res(res: Response<any, Record<string, any>>) {
        return res.status(200).json({message:'successful',data: this.T})  
    }
}
export {ResponseExpress, ResponseToCreated, ResponseGet}