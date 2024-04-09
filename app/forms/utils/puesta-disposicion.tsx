import {z} from "zod";

export const disponserSchema = z.object({
    names: z
      .string().trim()
      .min(2, {
        message: "el nombre debe de tener menos de 2 caracteres",
      })
      .max(100, {
        message: "el nombre no puede tener mas de 100 caracteres",
      }),
    fristsurname: z
      .string().trim().min(2, {message:"el apellido no puede tener menos de 2 caracteres"}).max(200,{
        message:"el apellido no puede tener mas de 100 caracteres"
      }),
    lastsurname: z
    .string().trim().min(2, {message:"el apellido no puede tener menos de 2 caracteres"}).max(200,{
      message:"el apellido no puede tener mas de 100 caracteres"
    }),
    assignment:z.string().trim().min(4, {
      message:"la adscripción no puede tener menos de 4 caracteres"
    }).max(150, {
      message:"la adscripción no puede tener mas de 150 caracteres"
    }),
    rank:z.string().trim().min(5, {
      message:"el rango no puede tener menos de 5 caracteres"
    }).max(150,{message:"el rango no puede tener mas de 150 caracteres"}),
    signatureImg: z.string().min(1, {
      message:"la firma no es valida"
    }),
  })



export type disponserFormValues = z.infer<typeof disponserSchema>


