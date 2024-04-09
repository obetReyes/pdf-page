import {z} from "zod";
export const registerSchema = z.object({
    email: z
      .string().trim().email("el correo electronico no es valido"),
    password: z
      .string().trim().min(2, {message:"La contraseña no es válida."      
      }),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "La contraseñas no coinciden",
    path: ["confirmPassword"],
  });