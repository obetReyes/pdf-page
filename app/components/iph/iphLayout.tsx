import { Link } from "@remix-run/react"
import { CleanFieldsBtn } from "./clean-fields-btn"
import { MenuBar } from "./menu-bar"



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
         {typeof window !== 'undefined' && window.localStorage.length > 0   ? <div className="hidden md:block my-2 max-w-sm"><CleanFieldsBtn /></div>: null}
         {typeof window !== 'undefined' && window.localStorage.length > 0   ? 
                      <Link  className="py-4 text-center  border text-black text-sm" to="/iph/generador">generador</Link>
                   : null}
        <MenuBar/>
        </div>
     
       
      
        
  
        
          <div className="flex-1 mx-auto lg:max-w-5xl">{children}</div>
          
        

    
      <div className="block lg:max-w-5xl mx-auto !my-24">
      <MenuBar/>
      </div>
     
    </section>
    </>
  

    
  )
}