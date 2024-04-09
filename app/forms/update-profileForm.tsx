/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef,useState, useEffect } from "react"
import { Trash2 } from "lucide-react"
import { Input, Button, Select,SelectTrigger, SelectValue,SelectContent,SelectGroup,SelectLabel, SelectItem, Label, useToast, Alert, AlertDescription, AlertTitle } from "~/components/ui"
import { states, municipalities, institutions } from "~/constants/mexico-info"
import { useSignaturePad } from "~/hooks/useSignaturePad"
import {  useFetcher, useLoaderData} from "@remix-run/react"
import { loader } from "~/routes/iph.perfil"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

interface FetcherResponse {
  message?: string;
  error?: string | any;
}



export const UpdateProfileForm = () => {
  const { toast } = useToast()
    const fetcher = useFetcher<FetcherResponse>();
    const data = useLoaderData<typeof loader>();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);  
    const {initCanvas,clearPad,drawing,finishDraw,startDraw} = useSignaturePad(canvasRef, contextRef) 


    const [stateSelected, setStateSelected] = useState<string | null>(data?.profile?.institutionstate as string)
    const [otherInstitution, setOtherInstitution] = useState<boolean>()
    const [newPassword, setNewPassword] = useState<boolean>(false)
    const signature = data?.profile?.signature; 
   
    useEffect(() => {
        initCanvas(signature);
        if(data?.profile?.institution  && !institutions.includes(data.profile.institution)){
          setOtherInstitution(true)

        }
    }, []);
    

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

   const $form = event.currentTarget;
   const formData = new FormData($form);

   const isSignature = canvasRef.current?.toDataURL()
  const isOtherInstitution = formData.get("otherinstitution");

    if(isOtherInstitution && isOtherInstitution?.toString().length > 1){
        formData.set("institution", isOtherInstitution.toString())
    }
   if(isSignature &&  isSignature.length > 1){
    formData.set("signature", isSignature)
   }
   fetcher.submit(formData, {
    method: "PATCH",
    action:"/perfil",
   });
  }
   
  useEffect(() => {
 
    if(fetcher.data?.message){
      setTimeout(() => {
        toast({
          variant:"default",
          title: "se ha actualizado tu perfil",
          description: "los cambios se veran reflejeados al generar nuevos documentos",
        })
      }, 100)
    }
    if(newPassword == true){
          setNewPassword(false)
    }
}, [fetcher.data?.message])


    return (
   <>
   <form  onSubmit={handleSubmit}>
                <div className="grid gap-4 lg:gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    <div>
                        <Label htmlFor="correo">Correo Electronico:</Label>
                        <Input name="correo" id="correo" type="email" 
                        defaultValue={data?.email}
                        />

                    </div>
                
                  </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 relative">
                   <Button type="button" onClick={() =>{
                    setNewPassword(true)
                   }} variant="secondary" className={`bg-slate-800 hover:bg-slate-700 text-white ${newPassword ? "hidden": "block"}`}>Cambiar Contraseña</Button>
                      {newPassword ? 
                      <>
                      
                    <div>
                   
                    <Label htmlFor="password">Contraseña:</Label>
                        <Input  name="password" id="password" type="password"/>
                    </div>
                    <div>
                    <Label htmlFor="confirmPassword">Confirmar Contraseña:</Label>
                        <Input name="confirmPassword" id="confirmPassword" type="password"/>
                    </div>
                    <Button onClick={() => {
                      setNewPassword(false)
                    }} size="sm" className="absolute right-0 top-[-10px]" variant='destructive'>
                       cancelar
                    </Button>
                  </>
                 : null}
                </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    <div>
                        <Label htmlFor="names">Nombres:</Label>
                        <Input name="names" id="names" type="text" 
                        defaultValue={data?.profile?.names}/>

                    </div>
                    <div>
                    <Label htmlFor="fristsurname">Primer Apellido:</Label>
                        <Input name="fristsurname" id="fristsurname" type="text" defaultValue={data?.profile?.fristsurname }/>
                    </div>
                  </div>
    
                  <div>
                  <Label htmlFor="lastsurname">Segundo Apellido:</Label>
                        <Input name="lastsurname" id="lastsurname" type="text" defaultValue={data?.profile?.lastsurname }/>
                  </div>
          
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    <div>
                    <Label htmlFor="assignment">Adscripción:</Label>
                        <Input name="assignment" id="assignment" type="text" defaultValue={data?.profile?.assignment}/>
                    </div>
                    <div>
                    <Label htmlFor="rank">Rango:</Label>
                        <Input name="rank" id="rank" type="text" defaultValue={data?.profile?.rank }/>
                    </div>
                  </div>
                 
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    <div>
                    <Label htmlFor="institutionstate">Estado:</Label>
                    <Select defaultValue={data?.profile?.institutionstate} onValueChange={(e:any) => {
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
                    <Select defaultValue={data?.profile?.institutionmunicipality && data.profile?.institutionmunicipality}  name="institutionmunicipality">
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
                  <Select defaultValue={data?.profile  && !institutions.includes(data?.profile?.institution) ? "null": data?.profile?.institution  }  onValueChange={(e:any) => {
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
             <><Label htmlFor="otherinstitution">Otra autoridad:</Label><Input defaultValue={data?.profile  && !institutions.includes(data?.profile?.institution) ? data.profile.institution: "" }   name="otherinstitution" id="otherinstitution" type="text" /></>
                    }
                        </div>    
                 </div>
                    <div>
                    <Button type="reset"  onClick={() => {
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
                    <Button type="submit" className="p-1 bg-blue-600 hover:bg-blue-500" variant="outline">actualizar perfil</Button>
                
                </div>
    
              
              </form>
            
              {fetcher.data?.error && fetcher.data.error.issues && fetcher.data.error.issues.map((issue:any) => {
              return(
              <Alert key={issue.path} variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
              {issue.message}
              </AlertDescription>
            </Alert>
              )
            })
            }
         
          {fetcher.data?.error &&  !fetcher.data.error.issues && 
          <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
          {fetcher.data.error}
          </AlertDescription>
        </Alert>
          }
              </>
  )
}


