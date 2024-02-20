import { Response } from "express";

class ResquestErrors {
  protected statusCode: number = 500;
  protected message: string = "";
  constructor() {}

  returnError(res: Response, message?: string) {
    this.message = message ?? '';
    res.status(this.statusCode).json({
      message: this.message,
    });
  }
}

class NotFound extends ResquestErrors {
  statusCode: number = 404;

  returnError(res: Response, message?: string) {
    this.message = message ?? "Not Found!";
    res.status(this.statusCode).json({
      message: this.message,
    });
  }
}

class BadRequest extends ResquestErrors {
  statusCode: number = 400;

  returnError(res: Response, message?: string) {
    this.message = message ?? "Bad Request!";
    res.status(this.statusCode).json({
      message: this.message,
    });
  }
}

class Unauthorized extends ResquestErrors {
  statusCode: number = 401;

  returnError(res: Response, message?: string) {
    this.message = message ?? "Unauthorized!";
    res.status(this.statusCode).json({
      message: this.message,
    });
  }
}

class InternalError extends ResquestErrors {
  statusCode: number = 500;

  returnError(res: Response, message?: string) {
    this.message = message ?? "Internal Server Error!";
    res.status(this.statusCode).json({
      message: this.message,
    });
  }
}

class Forbidden extends ResquestErrors {
  statusCode: number = 403;

  returnError(res: Response, message?: string) {
    this.message = message ?? "Forbidden!";
    res.status(this.statusCode).json({
      message: this.message,
    });
  }
}

class InvalidData extends BadRequest{

  returnError(res: Response, message?: string): void {
    this.message = message ?? "Invalid Data, Something Is Wrong!";
    res.status(this.statusCode).json({
      message: this.message,
    });
  }
}

class DefaultErrorResponseModule {
  constructor(private statusCode?: number) {}

  returnResponse(res: Response, message?: string) {
    
    if (!this.statusCode) {
      return new InternalError().returnError(res);
    }

    switch (this.statusCode) {
      case 400:
        return new BadRequest().returnError(res);

      case 401:
        return new Unauthorized().returnError(res);

      case 403:
        return new Forbidden().returnError(res);

      case 404:
        return new NotFound().returnError(res);

      case 500:
        return new InternalError().returnError(res);

      case 1001:
        return new InvalidData().returnError(res)

      default:
        return new BadRequest().returnError(res, message)
    }
  } 

  
}

export { DefaultErrorResponseModule };
