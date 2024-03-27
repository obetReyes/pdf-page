/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { ActionFunctionArgs, json } from "@remix-run/node"
import { Link, useActionData } from "@remix-run/react"
import { useEffect } from "react"
import { Alert, AlertDescription, AlertTitle, Button, Input, Label } from "~/components/ui"
import { loginSchema } from "~/forms/utils"
import { cn } from "~/lib/utils"
import { login } from "~/server/auth/auth.server"


export async function action({
  request,
}: ActionFunctionArgs){
  const formPayload = Object.fromEntries(await request.formData())
  try {
    const userLogin = loginSchema.parse(formPayload)
    // subscribe them to a newsletter or whatever
    const  email = userLogin.email;
    const password = userLogin.password;
    if (email.length == 0 && password.length == 0) throw new Error("usuario invalido")
    return await login({  email , password })
  } catch (error) {
    console.error(`form not submitted ${error}`)
    return json({ error });
  }
}

export default function Ingreso() {
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
         to="/registro"
          className={cn(
           
            "underline absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          crear cuenta
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
                Ingresar
              </h1>
              <p className="text-sm text-muted-foreground">
                inicia sesion para proceder a generar un IPH
              </p>
            </div>
                <form  id="puesta-disposicion"  method="POST"  className="space-y-6 h-full">
      
  <Label htmlFor="email">Correo Electronico</Label>
  <Input name="email" id="email" type="email"/>
  
  <Label htmlFor="password">Contraseña</Label>
  <Input name="password" id="password" type="password"/>
          

      <Button 
   type="submit" className="float-right bg-slate-900 text-white" variant="outline">Iniciar sesion</Button>    
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