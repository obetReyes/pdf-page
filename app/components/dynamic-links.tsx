import { Button } from './ui';
import { Link } from '@remix-run/react';


interface Props{
  isUser:boolean
}
export const DynamicLinks = ({isUser}:Props) => {
 
  return (
    isUser ?
      <>
         <Link to="iph/panel"
          className="rounded-md bg-gradient-to-br bg-foreground px-1 lg:px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md transition-transform duration-200 ease-in-out hover:scale-[1.03]">
          Generar IPH
      </Link>
      <form action="/logout" method="post">
              <Button type="submit" className="w-full md:w-auto bg-red-500 text-white" variant="link">
              Cerrar sesión
              </Button>
          </form> 
      </>
       
         : <form action="/ingreso" method="get">
         <Button type="submit" className="w-full md:w-auto bg-blue-500 text-white" variant="link">
         Iniciar sesion
         </Button>
     </form> 
          
  )
}
