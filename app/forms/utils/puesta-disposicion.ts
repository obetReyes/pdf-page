import {z} from "zod";
import { blackSpacesRefinements } from "./initialFormValues";
export const disponserSchema = blackSpacesRefinements(z.object({
    names: z
      .string()
      .min(2, {
        message: "el nombre debe de tener menos de 2 caracteres",
      })
      .max(100, {
        message: "el nombre no puede tener mas de 100 caracteres",
      }).refine(value => {
        return !/^\s*$/.test(value);
    }, {
        message: "el nombre no es valido."
    }),
    fristsurname: z
      .string().min(2, {message:"el apellido no puede tener menos de 2 caracteres"}).max(200,{
        message:"el apellido no puede tener mas de 100 caracteres"
      }).refine(value => {
        return !/^\s*$/.test(value);
    }, {
        message: "el nombre no es valido."
    }),
    lastsurname: z
    .string().min(2, {message:"el apellido no puede tener menos de 2 caracteres"}).max(200,{
      message:"el apellido no puede tener mas de 100 caracteres"
    }).refine(value => {
      return !/^\s*$/.test(value);
  }, {
      message: "el nombre no es valido."
  }),
    assignment:z.string().min(4, {
      message:"la adscripción no puede tener menos de 4 caracteres"
    }).max(150, {
      message:"la adscripción no puede tener mas de 150 caracteres"
    }).refine(value => {
      return !/^\s*$/.test(value);
  }, {
      message: "el nombre no es valido."
  }),
    rank:z.string().min(5, {
      message:"el rango no puede tener menos de 5 caracteres"
    }).max(150,{message:"el rango no puede tener mas de 150 caracteres"}).refine(value => {
      return !/^\s*$/.test(value);
  }, {
      message: "el nombre no es valido."
  }),
    isSignature:z.boolean().refine(value => value === true, {
      message: 'la firma no es valida.'
  }),
    signatureImg: z.string().optional(),
  }))

export const initialDisponserValues = {
       assignment:"",
      fristsurname:"",
      lastsurname:"",
      names:"",
      rank:"",
      isSignature:false,
      signatureImg:""
}

export type disponserFormValues = z.infer<typeof disponserSchema>


