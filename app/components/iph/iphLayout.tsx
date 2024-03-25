import {  Link, NavLink } from "@remix-run/react"
import { iphSections } from "~/constants/iph-sections"
import { Button } from "../ui/button"
import { CleanFieldsBtn } from "./clean-fields-btn"
import { useEffect, useState } from "react"

interface PROPS{
    children:JSX.Element | JSX.Element[]
}
export const IphLayout = ({children}:PROPS) => {
    const [isFilled, setIsFilled] = useState<boolean>(false)
    const [canClean, setCanCLean]  = useState<boolean>(false)

    useEffect(() => {
        for (const key in localStorage){
            if(localStorage.length > 0){
                setIsFilled(true)
            }
            if(localStorage.length > 0){
                setCanCLean(true)
            }
         }
    },[])
    
    return (

    <div className="flex  bg-gray-100">

  
    <div className="hidden   md:flex flex-col w-64 ">
        <div className="flex items-center justify-center  bg-slate-900">
            <span className="text-white scroll-m-20  text-center p-4 text-xl font-semibold tracking-tight uppercase">Informe Policial Homologado</span>
        </div>
        <div className="flex flex-col  flex-grow overflow-hidden">
            <nav className="flex-1 flex flex-col gap-4  px-2 py-4 bg-slate-800">
                {
                    iphSections.map((section) => {
                        return(
                            <NavLink
                            className={({ isActive}) =>
                            `flex items-center px-4 py-2 text-white hover:bg-blue-900  ${isActive && "underline"}`
                          }
                             key={section.label} to={section.href}>
                    
                           
                            {section.label}
                    
                            </NavLink>
                        
                        )
                    })
                }
           
           {isFilled   ? 
           <Link to="/iph/generador"  className="flex items-center  text-white bg-slate-900 p-4" >
                    
                    generar documento
   
           </Link>
                    
                   : null}
                   
                   {canClean  ? <CleanFieldsBtn />: null}
            </nav>
        </div>
    </div>

    <div className="flex flex-col flex-1">
      
        <div className="p-4">
            {children}
        </div>
    </div>
    
</div>
  )
}
