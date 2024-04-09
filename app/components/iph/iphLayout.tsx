import {  Link, NavLink } from "@remix-run/react"
import { iphSections } from "~/constants/iph-sections"
import { CleanFieldsBtn } from "./clean-fields-btn"
import {Pickaxe } from "lucide-react"
import { QuestionMarkIcon } from "@radix-ui/react-icons"
import { TutorialDialog } from "./tutorial-dialog"
import { useContext } from "react"
import { FormContext } from "~/contexts/form/formContext"

QuestionMarkIcon
interface PROPS{
    children:JSX.Element | JSX.Element[]
}

  
export const IphLayout = ({children}:PROPS) => {


    const {IPHdata} = useContext(FormContext);
    return (

    <div className="grid grid-cols-3 grid-rows-1 px-2 md:px-10 py-2 bg-gray-100">
     
  <div className="flex justify-end w-full h-full">

  <div className="hidden  rounded-md shadow-2xl shadow-slate-600/50 md:flex flex-col w-64">
        <div className="flex items-center justify-center rounded-t-lg  ">
            <span className=" scroll-m-20  text-center p-4 text-xl font-semibold tracking-tight uppercase drop-shadow-2xl">Informe Policial Homologado</span>

        </div>
        <div className="flex flex-col  flex-grow overflow-hidden">
            <nav className="flex-1  rounded-b-lg  flex flex-col gap-4  px-2 py-4 ">
                {
                    iphSections.map((section) => {
                        return(
                            <NavLink
                            className={({ isActive}) =>
                            `flex items-center px-4 py-2  hover:bg-slate-400 drop-shadow-2xl  ${isActive && "underline bg-slate-400 shadow-md shadow-slate-600/50 "}`
                          }
                             key={section.label} to={section.href}>
                            
                    {section.icon}
                            {section.label}
                    
                            </NavLink>
                        
                        )
                    })
                }
           
           
           {Object.keys(IPHdata).length > 0 ? 
           <Link to="/iph/generador"  className="flex items-center  text-white bg-slate-700 shadow-slate-800/50 rounded shadow-xl p-2" >
                    <Pickaxe  className="w-4 h-4 mr-2" />
                    generar documento
           </Link>
                    
                   : null}
                   
                   {Object.keys(IPHdata).length > 0  ? <CleanFieldsBtn />: null}
            </nav>
        </div>
    </div>
  </div>
  

    <div className="col-span-3 md:col-span-2 flex  flex-col">
      <TutorialDialog/>
        <div className="p-4">
                
            {children}
        </div>
    </div>
    
</div>
  )
}
