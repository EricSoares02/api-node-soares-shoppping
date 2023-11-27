import { Response } from "express";

class ResquestErrors {
  public statusCode: number = 500;
  constructor(protected message: string, protected res: Response) {
    this.message;
  }

  public returnError() {
    this.res.status(this.statusCode).json({
      message: this.message,
    });
    
  }
}

class NotFound extends ResquestErrors{
    public statusCode: number = 404;
    public returnError() {
      return this.res.status(this.statusCode).json({
        message: this.message,
      });
    }
}

class BadRequest extends ResquestErrors{
  public statusCode: number = 400;
  public returnError() {
   return this.res.status(this.statusCode).json({
      message: this.message,
    });
  }
}

class Unauthorized extends ResquestErrors{
  public statusCode: number = 401;
  public returnError() {
    return this.res.status(this.statusCode).json({
      message: this.message,
    });
  }
}

class InternalError extends ResquestErrors{
  public statusCode: number = 500;
  public returnError() {
    return this.res.status(this.statusCode).json({
      message: this.message,
    });
  }
}

export { NotFound, BadRequest, Unauthorized, InternalError };
