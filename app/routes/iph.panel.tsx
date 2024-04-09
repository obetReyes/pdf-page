import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ClipboardPlus, Settings } from "lucide-react";
import { DataTable } from "~/components/iph/data-table";
import { Button } from "~/components/ui";
import { getUser } from "~/server/auth/auth.server";
interface User {
    id: string;
    email: string;
}

type UserT = User | null;

export const loader: LoaderFunction = async ({ request }) => {
  const user:UserT = await getUser(request)
  return user
}


export default  function Iph(){
    const user:UserT = useLoaderData()
    return(
        <div className="flex flex-col p-2 md:p-10 w-full h -screen">
                <div className="w-full flex  flex-col justify-center items-center h-[250px] gap-2 md:gap-8   bg-slate-800">
                    <p className="text-white">{user?.email}</p>
                    <Link to="/iph/perfil" > <Button size="lg" className="shadow-2xl  md:p-4 bg-blue-300 hover:bg-blue-400 text-black rounded-md"><Settings className="w-4 h-4 mr-2" /> editar Perfil</Button></Link>
                    <Link to="/iph/puesta-a-disposicion">
                    <Button size="lg" className="shadow-2xl md:p-4 first:mt-0 bg-gray-300 hover:bg-gray-400 text-black shadow-gray-400/50  rounded-md " >
                
                    <ClipboardPlus className="w-4 h-4 mr-2" />
                        crear IPH
                        </Button>
                        </Link>
                </div>
                <DataTable />

        </div>
    )
}