import { Button, Input, Label } from "~/components/ui"
import { loginSchema } from "./utils/ingreso";
import { ActionFunction, ActionFunctionArgs } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
export const IngresoForm = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data:any = useActionData();
  return (
    
    <form  id="puesta-disposicion"  method="POST"  className="space-y-6 h-full">
        
    <Label htmlFor="email">Correo Electronico</Label>
    <Input type="email"/>
    
    <Label htmlFor="password">Contraseña</Label>
    <Input type="password"/>
            
    {data && data.error && (<p>Your form had an error!</p>)}

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
      const userLogin = loginSchema.parse(formPayload)
      // subscribe them to a newsletter or whatever
      if(userLogin.email){

      }
      return redirect(`/confirmed`)
    } catch (error) {
      console.error(`form not submitted ${error}`)
      return json({ error });
    }
  }