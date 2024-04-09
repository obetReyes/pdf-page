/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSubmit, useActionData } from '@remix-run/react';
import { Trash2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { Input, Button,  Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem, Label } from '~/components/ui';
import { states, municipalities, institutions } from '~/constants/mexico-info';
import { useSignaturePad } from '~/hooks/useSignaturePad';
import { action } from '~/routes/logout';

export const Profileform = () => {
    const submit = useSubmit();
    const actionData = useActionData<typeof action>();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);  

    const {initCanvas,clearPad,drawing,finishDraw,startDraw} = useSignaturePad(canvasRef, contextRef)
    const [stateSelected, setStateSelected] = useState<string | null>()
    const [otherInstitution, setOtherInstitution] = useState<boolean>()


    useEffect(() => {
        initCanvas();
    }, [])


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
   const $form = event.currentTarget;
   const formData = new FormData($form);

   const isSignature = canvasRef.current?.toDataURL()
    
   if(isSignature &&  isSignature.length > 1){
    formData.set("signature", isSignature)
   }
    submit(formData, {
      method: "POST",
      action:"/perfil"
    });
  }


    return(
        <>
        <form  onSubmit={handleSubmit}>
                     <div className="grid gap-4 lg:gap-6">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                         <div>
                             <Label htmlFor="names">Nombres:</Label>
                             <Input name="names" id="names" type="names" 
                             />
     
                         </div>
                         <div>
                         <Label htmlFor="fristsurname">Primer Apellido:</Label>
                             <Input name="fristsurname" id="fristsurname" type="fristsurname" />
                         </div>
                       </div>
         
                       <div>
                       <Label htmlFor="lastsurname">Segundo Apellido:</Label>
                             <Input name="lastsurname" id="lastsurname" type="lastsurname" />
                       </div>
               
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                         <div>
                         <Label htmlFor="assignment">Adscripción:</Label>
                             <Input name="assignment" id="assignment" type="text" />
                         </div>
                         <div>
                         <Label htmlFor="rank">Rango:</Label>
                             <Input name="rank" id="rank" type="text"/>
                         </div>
                       </div>
                      
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                         <div>
                         <Label htmlFor="institutionstate">Estado:</Label>
                         <Select  onValueChange={(e:any) => {
                          
                           setStateSelected(e)}}  name="institutionstate">
           <SelectTrigger >
             <SelectValue placeholder="estado" />
           </SelectTrigger>
           <SelectContent>
             <SelectGroup>
               <SelectLabel>estado</SelectLabel>
               {states.map((state) => {
                 return(
                   <SelectItem 
      value={state.estado} key={state.estado}>
                       {state.estado}
                   </SelectItem>
                 )
               })}
             </SelectGroup>
           </SelectContent>
         </Select>
                         </div>
                         
                         <div>
                         <Label htmlFor="institutionmunicipality">Municipio:</Label>
                         <Select name="institutionmunicipality">
           <SelectTrigger >
             <SelectValue placeholder="municipio" />
           </SelectTrigger>
           <SelectContent>
             <SelectGroup>
               <SelectLabel>municipio</SelectLabel>
               {stateSelected ? 
               municipalities(stateSelected).map((municipality) => {
                 return(
                   <SelectItem 
      value={municipality.municipio} key={municipality.municipio}>
                       {municipality.municipio}
                   </SelectItem>
                 )
               })
             : 
             <SelectItem 
             value="null" key="nullmunicipality" disabled={true}>
                              elige un estado
                          </SelectItem>
                   
             }
             </SelectGroup>
           </SelectContent>
         </Select>
                         </div>
                       </div>
                       
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                      <div>
                       <Label htmlFor="institution">Institucion:</Label>
                       <Select   onValueChange={(e:any) => {
                           e == "null" ? setOtherInstitution(true) : setOtherInstitution(false)
                           }} name="institution">
           <SelectTrigger >
             <SelectValue placeholder="Instituciones" />
           </SelectTrigger>
           <SelectContent>
             <SelectGroup>
               <SelectLabel>Institucion a la que pertenece</SelectLabel>
               {institutions.map((institution) => {
                 return(
                   <SelectItem value={institution} key={institution}>
                       {institution}
                   </SelectItem>
                 )
               })}
                <SelectItem value="null" key="otraautoridad">
                   otra autoridad
                 </SelectItem>
             </SelectGroup>
           </SelectContent>
         </Select>
                  
                       </div>
                       <div>
                         {otherInstitution &&
                  <><Label htmlFor="otherinstitution">Otra autoridad:</Label><Input name="otherinstitution" id="otherinstitution" type="text" /></>
                         }
                             </div>    
                      </div>
                         <div>
                         <Button  onClick={() => {
               clearPad();
             } }
               className="float-right bg-primary text-white" variant="outline"
             >
               <Trash2 className="w-4 h-4 mr-2" /> borrar firma
             </Button>
             <canvas
               id="signature"
                 className="mt-2 w-full h-80 !object-contain  !border  rounded !border-slate-300"
                 onMouseDown={(e) => {
                   startDraw(e);
                 }}
                 onMouseUp={() => {
                   finishDraw();
                 }}
                 onMouseLeave={() => {
                   finishDraw();
                 }}
                 onMouseMove={(e) => {
                   drawing(e);
                 }}
                 ref={canvasRef} 
                 />
                         </div>
                       
                 
                     </div>
         
                     
         
                     <div className="mt-6 grid">
                         <Button type="submit" className="p-1 bg-blue-600 hover:bg-blue-500" variant="outline">Crear Perfil</Button>
                     
                     </div>
         
                   
                   </form>
                   {actionData?.error}
                   </>
  )
}

