import {z} from "zod";
export const loginSchema = z.object({
    email: z
      .string().trim().email("el correo electronico no es valido"),
    password: z
      .string().trim().min(5, {message:"La contraseña no es válida."      
      })
  })
