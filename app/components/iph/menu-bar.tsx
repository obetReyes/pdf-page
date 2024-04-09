import * as React from "react"
import { Link, NavLink} from "@remix-run/react"
import { useMediaQuery, useCheckLocalStorage } from "~/hooks"
import { Slash, MenuIcon, Pickaxe } from "lucide-react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTrigger,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"
import { Button } from "../ui/button"
import { CleanFieldsBtn } from "./clean-fields-btn"
import { iphSections } from "~/constants/iph-sections"

export function MenuBar() {
  const [open, setOpen] = React.useState(false)
  const {isFilled, canClean} = useCheckLocalStorage(0)
    
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <Breadcrumb className="my-4  w-full p-3 md:hidden">
      <BreadcrumbList>
            

        
          
            <BreadcrumbItem>
              {isDesktop ? (
               
               
               <div>
                 {iphSections.map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.href && (
              <li>
                <BreadcrumbLink
                  asChild
                  className="max-w-20  md:max-w-none"
                >
                  <Link to={item.href}>{item.label}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator>
      <Slash />
    </BreadcrumbSeparator>
              </li>
            )}
          </BreadcrumbItem>
        ))}
               </div>
              ) : (
                <>
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger aria-label="Toggle Menu" className="flex    gap-2 text-black !text-center !mx-auto rounded items-center   w-96 p-2 ">
                
                    <p className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">secciones del iph</p>
                    <MenuIcon className="bg-white border border-black  !text-center  !mx-auto shadow-md ml-4 h-8 w-8"/>

                    
                    
                  </DrawerTrigger>
                  <DrawerContent >
                    <DrawerHeader className="text-left text-black">
                      <DrawerTitle>Seleccionar Sección</DrawerTitle>
                      <DrawerDescription>
                        Elige la Seccion del IPH
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="grid gap-1 px-4 ">
                    {
                    iphSections.map((section) => {
                        return(
                            <NavLink
                            className={({ isActive}) =>
                            `flex  items-center px-4 py-2  hover:bg-slate-400 drop-shadow-2xl  ${isActive && "underline bg-slate-400 shadow-md shadow-slate-600/50 "}`
                          }
                             key={section.label} to={section.href}>
                            
                    {section.icon}
                            {section.label}
                    
                            </NavLink>
                        
                        )
                    })
                }
           
                       {isFilled   ? 
           <Link to="/iph/generador"  className="mt-4 flex items-center  text-white bg-slate-700 shadow-slate-800/50 rounded shadow-xl p-2" >
                    <Pickaxe  className="w-4 h-4 mr-2" />
                    generar documento
           </Link>
                    
                   : null}
                   
                   {canClean  ? <CleanFieldsBtn />: null}
                          
                    </div>
                    <DrawerFooter className="pt-4">
                      <DrawerClose asChild>
                        <Button variant="outline">Cancelar</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
        
        
      </BreadcrumbList>
    </Breadcrumb>
  )
}
