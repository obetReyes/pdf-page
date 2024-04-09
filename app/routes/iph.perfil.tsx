/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { UpdateProfileForm } from "~/forms/update-profileForm";
import { getUser} from "~/server/auth/auth.server";
import { prisma } from "~/server/prisma/prisma.server";

export const loader = async ({
    request,
  }: LoaderFunctionArgs) => {
            const user = await getUser(request)
            const userData = await prisma.user.findUnique({
              where:{
                id: user?.id 
              },select:{
                email:true,
                profile:true
              }
            })
      
        return json(userData)
  }
  


export default function panelPerfil() {
    return(
<section className="bg-gray-100 ">
  <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
      <div className="lg:col-span-2 lg:py-12">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    Perfil 
    </h1>
    
    <blockquote className="mt-6 border-l-2 pl-6 italic">        Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en donde quiera que vayas
    
    <div className="mt-8 h-full">
          <a href="/" className="text-2xl font-bold text-pink-900">JOSUE 1:9</a>
        </div>
    </blockquote>
      </div>

      <div className="rounded-lg  bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
        <UpdateProfileForm/>
      </div>
    </div>
  </div>
</section>
    )
}