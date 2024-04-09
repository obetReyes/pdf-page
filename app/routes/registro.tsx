/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, AlertDescription, AlertTitle, Button, Input, Label } from "~/components/ui"
import { registerSchema } from "~/forms/utils";
import { ActionFunctionArgs, LoaderFunction, json, redirect } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import {  getUser, register } from "~/server/auth/auth.server";
import { useEffect } from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { cn } from "~/lib/utils";

export const loader: LoaderFunction = async ({ request }) => {
  // If there's already a user in the session, redirect to the home page
  return (await getUser(request)) ? redirect('/iph/puesta-a-disposicion') : null
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
    return json({error:error});
  }
}
export default function Registro() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data:any = useActionData();
    useEffect(() => {
      console.log("data",data)
    }, [])
    return (
      <>
     
      <div
        className="block md:hidden w-full  h-[250px]  md:w-[1280px] md:h-[843px] bg-black"
      />
    <div className="container-fluid relative   h-screen flex-col items-center justify-center md:grid lg:max-w-none md:grid-cols-2 lg:px-0">
      <Link
       to="/ingreso"
        className={cn(
         
          "underline absolute right-4 top-6 md:right-8 md:top-8"
        )}
      >
     Iniciar sesión
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white md:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Acme Inc
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than
              ever before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {data && data.error.issues && data.error.issues.map((issue:any) => {
            return(
            <Alert key={issue.path} variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
            {issue.message}
            </AlertDescription>
          </Alert>
            )
          })
          }
       
        {data && data.error &&  !data.error.issues && 
        <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
        {data.error}
        </AlertDescription>
      </Alert>
        }
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Crear Cuenta
            </h1>
           
          </div>
          <form  id="puesta-disposicion"  method="POST"  className="space-y-4  px-6 md:p-0 h-full">
        
        <Label htmlFor="email">Correo Electronico</Label>
        <Input  id="email" name="email" type="email"/>
        
        <Label htmlFor="password">Contraseña</Label>
        <Input id="password" name="password" type="password"/>
    
        
        <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
        <Input id="confirmPassword" name="confirmPassword" type="password"/>
                
        {data && data.error && (<p>{data.error.message}</p>)}
    
            <Button 
         type="submit" className="float-right bg-slate-900 text-white" variant="outline">Registrarse</Button>    
        </form>
          <p className="px-8 text-center text-sm text-muted-foreground">
          Al hacer clic en continuar, aceptas nuestros {" "}
            <Link
             to="/"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terminos y condiciones
            </Link>{" "}
            y la{" "}
            <Link
             to="/p"
              className="underline underline-offset-4 hover:text-primary"
            >
              politica de privacidad
            </Link>
            .
          </p>
          
        </div>
      </div>
    </div>
  </>
  
           

  )
}

