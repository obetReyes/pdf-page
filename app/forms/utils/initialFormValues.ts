/* eslint-disable @typescript-eslint/no-explicit-any */
import { z, ZodObjectShape, ZodRawShape } from "zod";

export const validateBlankSpaces = (value:string) => {
    return !/^\s*$/.test(value) ? true : "no se aceptan solo caracteres en blanco";
};


  
export function blackSpacesRefinements(
    schema:  z.ZodType<any, any>

  ) {
    z.parseSchema
    return schema.refine(value => {
        return !/^\s*$/.test(value);
    }, {
        message: "el nombre no es valido."
    });
  }




function validateDisponser(data: DisponserSchemaType) {
    // Validate data using the schema
    const result = disponserSchema.safeParse(data);
    
    if (result.success) {
      console.log("Data is valid:", result.data);
    } else {
      console.error("Validation errors:", result.error.errors);
    }
  }
  