import { Schema, z } from "zod";
import { IDataValidations } from "../interfaces/IDataValidations";
import { NextFunction } from "express";

 function ValidationData(Schema: Schema, data: IDataValidations, next: NextFunction) {
  try {
    Schema.parse(data?.data)
   next()
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("Some property is wrong or missing: " + error.issues);
    
    }
    next(error)
    // if (error instanceof z.ZodError) {
    //   console.log(error.issues);
    // }
    // throw new BadRequest("invalid data");
  }
}

export { ValidationData };
