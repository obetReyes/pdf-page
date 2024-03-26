import { Button, Input, Label } from "~/components/ui"
import { registerSchema } from "~/forms/utils";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import {  register } from "~/server/auth/auth.server";
import { useEffect } from "react";
export const Registro = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data:any = useActionData();
    useEffect(() => {
      console.log("data",data)
    }, [])
    return (
    
    <form  id="puesta-disposicion"  method="POST"  className="space-y-6 h-full">
        
    <Label htmlFor="email">Correo Electronico</Label>
    <Input type="email"/>
    
    <Label htmlFor="password">Contraseña</Label>
    <Input type="password"/>

    
    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
    <Input type="confirmPassword"/>
            
    {data && data.error && (<p>{data.error.message}</p>)}

        <Button 
     type="submit" className="float-right bg-cyan-900 text-white" variant="outline">Iniciar sesion</Button>    
    </form>
           

  )
}


export async function action({
    request,
  }: ActionFunctionArgs){
    const formPayload = Object.fromEntries(await request.formData())
    try {
      
      const userRegister = registerSchema.parse(formPayload)
      // subscribe them to a newsletter or whatever
      const  email = userRegister.email;
      const password = userRegister.password;
      const confirmPassword = userRegister.confirmPassword
      return await register({  email , password, confirmPassword })
    } catch (error) {
      console.error(`form not submitted ${error}`)
      return json({ error });
    }
  }