import { PuestaDisposicionForm } from "~/forms/puestaDisposicionForm"
import { IphLayout } from "~/components/iph/iphLayout"
import { Button } from "~/components/ui"
import { getUser } from "~/server/auth/auth.server"
import { LoaderFunctionArgs, json } from "@remix-run/node"
import { prisma } from "~/server/prisma/prisma.server"
import { useLoaderData } from "@remix-run/react"
import { useState } from "react"

export const loader = async ({
  request,
}: LoaderFunctionArgs) => {
          const user = await getUser(request)
          const userData = await prisma.user.findUnique({
            where:{
              id: user?.id 
            },select:{
              profile:true
            }
          })
    
      return json(userData)
}



export default function PuestaDisposicion () {
  const profileData = useLoaderData<typeof loader>();
  const [profileValues, setProfileValues]= useState<typeof profileData>(null)
  return (
<IphLayout>
<div className="lg:max-w-5xl mx-auto ">
      <div className='mb-3'>
        <h3 className="text-lg font-medium">PUESTA A DISPOSICIÓN</h3>
        {profileValues == null ? 
        <Button variant="link" className="float float-right bg-blue-500 hover:bg-blue-600 text-white" onClick={() =>{
          console.log("click")
          setProfileValues(profileData)}}>usar los datos de mi perfil</Button> : <Button variant="link" className="float float-right bg-blue-500 hover:bg-blue-600 text-white" onClick={() =>setProfileValues(null)}>cambiar a datos</Button>}
        <p className="text-sm text-muted-foreground">
        Datos de quien realiza la puesta a disposición
        </p>
      </div>
          <PuestaDisposicionForm/>
          </div>
    </IphLayout>
  )
}


