import {z} from "zod";
export const loginSchema = z.object({
    email: z
      .string().trim()
      .min(2, {
        message: "el correo electronico debe de tener menos de 2 caracteres",
      }).email("el correo electronico no es valido"),
    password: z
      .string().trim().min(2, {message:"La contraseña no es válida."      
      }),
    confirmPassword: z.string().min(2),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "La contraseñas no coinciden",
    path: ["confirmPassword"],
  });