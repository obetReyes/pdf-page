"use client"

import * as React from "react"
import { Link } from "@remix-run/react"
import { useMediaQuery } from "~/hooks/useMediaQuery"
import { Slash } from "lucide-react"
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
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"
import { Button } from "../ui/button"
import { CleanFieldsBtn } from "./clean-fields-btn"

const iphSections = [
    {
       label: "puesta  a disposicion",
        href: "/iph/puesta-a-disposicion",
      },
      {
       label: "primer respondiente",
        href: "/iph/primer-respondiente",
      },
      {
       label: "conocimiento del hecho",
        href: "/iph/conocimiento-del-hecho",
      },
      {
       label: "lugar de la intervencion",
        href: "/iph/lugar-intervencion",
      },
      {
       label: "narrativa de los hechos",
        href: "/iph/narrativa-hechos",
      },
      {
       label: "anexos",
        href: "/iph/anexos",
      },
]

export function MenuBar() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <Breadcrumb className="my-4 bg-blue-700 p-3 ">
      <BreadcrumbList>
            

        
          
            <BreadcrumbItem>
              {isDesktop ? (
               
               
               <>
                 {iphSections.map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.href && (
              <>
                <BreadcrumbLink
                  asChild
                  className="max-w-20  md:max-w-none"
                >
                  <Link to={item.href}>{item.label}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator>
      <Slash />
    </BreadcrumbSeparator>
              </>
            )}
          </BreadcrumbItem>
        ))}
               </>
              ) : (
                <>
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger aria-label="Toggle Menu" className="flex  gap-2">
                  <>
                    {iphSections.slice(0,2).map((item) => {
                        return(
                            <BreadcrumbItem  key={item.label}>
                            <BreadcrumbLink  href={item.href}>
                                {item.label}
                            </BreadcrumbLink>
                            </BreadcrumbItem>
                        )
                   
                })}
                    </>
                    <BreadcrumbEllipsis className="h-4 w-4"/>

                    
                    
                  </DrawerTrigger>
                  <DrawerContent className="bg-blue-900">
                    <DrawerHeader className="text-left text-white">
                      <DrawerTitle>Seleccionar Sección</DrawerTitle>
                      <DrawerDescription>
                        Elige la Seccion del IPH
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="grid gap-1 px-4 ">
                      {iphSections.slice(2).map((item, index) => (
                        <Link
                          key={index}
                          to={item.href ? item.href : "#"}
                          className="py-4 text-center  border text-white text-sm"
                        >
                          {item.label}
                        </Link>
                      ))}
                      {typeof window !== 'undefined' && window.localStorage.length > 0   ? <CleanFieldsBtn setOpen={setOpen} />: null}
                          

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
