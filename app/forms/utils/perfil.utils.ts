import {z,} from "zod";

export  interface ProfileFormPropsI{
    formMethod: "POST" | "PATCH"
}

export const CreateProfileSchema = z.object({
names: z.string().trim()
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
    signature: z.string().min(1, {
      message:"la firma no es valida"
    }),
    institution:z.string().trim().min(4, {
      message:"la adscripción no puede tener menos de 4 caracteres"
    }).max(150, {
      message:"la adscripción no puede tener mas de 150 caracteres"
    }),
    institutionstate: z.string().trim().min(4),
    
    institutionmunicipality:z.string().trim().min(4, {
      message:"la adscripción no puede tener menos de 4 caracteres"
    }).max(150, {
      message:"la adscripción no puede tener mas de 150 caracteres"
    }),
  });



export const EditProfileSchema = z.object({
  email: z
  .string().trim().email("el correo electronico no es valido").optional(),
password: z
  .string().trim().min(2, {message:"La contraseña no es válida."      
  }).optional(),
confirmPassword: z.string().optional(),
  names: z
  .string().trim()
  .min(2, {
    message: "el nombre debe de tener menos de 2 caracteres",
  })
  .max(100, {
    message: "el nombre no puede tener mas de 100 caracteres",
  }).optional(),
fristsurname: z
  .string().trim().min(2, {message:"el apellido no puede tener menos de 2 caracteres"}).max(200,{
    message:"el apellido no puede tener mas de 100 caracteres"
  }).optional(),
lastsurname: z
.string().trim().min(2, {message:"el apellido no puede tener menos de 2 caracteres"}).max(200,{
  message:"el apellido no puede tener mas de 100 caracteres"
}).optional(),
assignment:z.string().trim().min(4, {
  message:"la adscripción no puede tener menos de 4 caracteres"
}).max(150, {
  message:"la adscripción no puede tener mas de 150 caracteres"
}).optional(),
rank:z.string().trim().min(5, {
  message:"el rango no puede tener menos de 5 caracteres"
}).max(150,{message:"el rango no puede tener mas de 150 caracteres"}).optional(),
signature: z.string().min(1, {
  message:"la firma no es valida"
}).optional(),
institution:z.string().trim().min(4, {
  message:"la adscripción no puede tener menos de 4 caracteres"
}).max(150, {
  message:"la adscripción no puede tener mas de 150 caracteres"
}).optional(),
institutionstate: z.string().trim().min(4).optional(),

institutionmunicipality:z.string().trim().min(4, {
  message:"la adscripción no puede tener menos de 4 caracteres"
}).max(150, {
  message:"la adscripción no puede tener mas de 150 caracteres"
}).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "La contraseñas no coinciden",
  path: ["confirmPassword"],
});
export type CreateProfileFormValues = z.infer<typeof CreateProfileSchema>



