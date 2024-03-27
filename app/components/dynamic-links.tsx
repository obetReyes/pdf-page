import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getUser } from '~/server/auth/auth.server';
import { Button } from './ui';


export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  // If there's already a user in the session, redirect to the home page
  return user
}

export const DynamicLinks = () => {
  const user = useLoaderData()
  return (
    user ?
      <>
         <a href="iph/generariph"
          className="rounded-md bg-gradient-to-br bg-foreground px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md transition-transform duration-200 ease-in-out hover:scale-[1.03]">
          Generar IPH
      </a>
      <form action="/logout" method="post">
              <Button type="submit" className="bg-blue-500 text-white" variant="link">
              Cerrar sesión
              </Button>
          </form> 
      </>
       
         : <form action="/ingreso" method="get">
         <Button type="submit" className="bg-blue-500 text-white" variant="link">
         Iniciar sesion
         </Button>
     </form> 
          
  )
}
