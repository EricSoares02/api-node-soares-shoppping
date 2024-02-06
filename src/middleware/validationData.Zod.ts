import { Schema } from "zod";


class ZodValidationData{

  private Schema
  private data

  constructor(Schema: Schema, data: any){
    this.Schema = Schema
    this.data = data
  }

  parse(){
    
   const result = this.Schema.safeParse(this.data);
    
   if (!result.success) {
    return false
  } else {
    return true
  }

  }


}


export { ZodValidationData };
