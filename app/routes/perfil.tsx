import { redirect, type ActionFunctionArgs, ActionFunction, json} from "@remix-run/node"; // or cloudflare/deno
import {    CreateProfileSchema, EditProfileSchema } from "~/forms/utils/perfil.utils";
import { requireUserId } from "~/server/auth/auth.server";
import { prisma } from "~/server/prisma/prisma.server";
import bcrypt from 'bcryptjs'
import { isBlankSignature } from "~/forms/utils/is-blank-signature";


export const action:ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
   try {
  const user =   await requireUserId(request)
  const formPayload = Object.fromEntries(await request.formData())
  switch (request.method) {
    case "POST": {
      
      try {
     
        const userProfile = CreateProfileSchema.parse(formPayload)
        
        const dataToPost = {...userProfile, userId:user}
        await prisma.profile.create({
            data:dataToPost
        })
        /* handle "POST" */
        return redirect("/iph/panel");
      } catch (error) {
        return json({ error });
      }
     
    
     
      
    }
    case "PATCH": {

      try {
        console.log("edituserprofile")
    
        const editUserProfile =  EditProfileSchema.parse(formPayload)
  
      const {password,email,confirmPassword, ...profileData} = editUserProfile

      if (profileData.signature) {
        const isBlank = await isBlankSignature(profileData.signature);
        if (isBlank) {
            throw new Error("La firma no es válida");
        } 
    }
    
    if (password) {
      const passwordHash = await bcrypt.hash(password, 12);
      await prisma.user.update({
          where: {
              id: user,
          },
          data: {
              password: passwordHash,
              email: email,
              profile: {
                  update: profileData,
              },
          },
      });
  }

  await prisma.user.update({
      where: {
          id: user,
      },
      data: {
          email: email,
          profile: {
              update: profileData,
          },
      },
  });

  return json({ message: "se ha actualizado con exito" });
    } catch (error) {
      console.log("error", error)
      const errorMessage = (error as Error).message;
      return json({error:errorMessage });
      }
      
      
    }
    case "DELETE": {
      await prisma.user.delete({
        where:{
          id:user
        }
      })
      return(redirect("/"))
    }
  }
}catch (error) {
  return new Response("Error interno del servidor", { status: 500 });
}
};
