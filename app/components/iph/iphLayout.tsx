import { Link } from "@remix-run/react"
import { CleanFieldsBtn } from "./clean-fields-btn"
import { MenuBar } from "./menu-bar"
import { Button } from "../ui/button"



interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function IPHLayout({ children }: SettingsLayoutProps) {
  return (
    <>
     <section className="2xl:w-10/12 h-screen p-4 mx-auto">
       <div className="space-y-0.5 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Generar Informe Policial Homologado</h2>
          <p className="text-muted-foreground">
            llena  las secciones del  formulario para generar un informe policial homologado que cumpla con el formato requerido por las autoridades
          </p>
        </div>
        <div className="lg:max-w-5xl mx-auto">
          <div className="flex justify-between items-center">
          
         {typeof window !== 'undefined' && window.localStorage.length > 0   ? 
                      <Link  to="/iph/generador"><Button className="bg-slate-800 hover:bg-slate-700 text-white p-6" variant="link">generar documento</Button></Link>
                   : null}
                   {typeof window !== 'undefined' && window.localStorage.length > 0   ? <div className="hidden md:block my-2 max-w-sm"><CleanFieldsBtn /></div>: null}
            </div>   
        <MenuBar/>
        </div>
     
       
      
        
  
        
          <div className="flex-1 mx-auto lg:max-w-5xl">{children}</div>
          
        

    
      <div className="block lg:max-w-5xl mx-auto !my-24">
      <MenuBar/>
      <div className="flex justify-between items-center">
          
          {typeof window !== 'undefined' && window.localStorage.length > 0   ? 
                       <Link  to="/iph/generador"><Button className="bg-slate-800 hover:bg-slate-700 text-white p-6" variant="link">generar documento</Button></Link>
                    : null}
                    {typeof window !== 'undefined' && window.localStorage.length > 0   ? <div className="hidden md:block my-2 max-w-sm"><CleanFieldsBtn /></div>: null}
             </div>   
      </div>
     
    </section>
    </>
  

    
  )
}