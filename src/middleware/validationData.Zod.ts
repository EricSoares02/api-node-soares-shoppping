import { Schema, z } from "zod";

 function ValidationData(Schema: Schema, data: any) {
  try {
    Schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("Some property is wrong or missing: " + error.issues);
    
    }
  }
}

export { ValidationData };
