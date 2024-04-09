/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from "@hookform/resolvers/zod"
import {  SubmitHandler, useForm } from "react-hook-form"
import { FormControl,  FormField, FormItem, FormLabel, FormMessage, Form } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Save, } from "lucide-react"
import { toast } from "~/components/ui/use-toast"
import { useContext, useEffect,  } from "react"
import { ToastAction } from "~/components/ui/toast"
import { FormContext } from "~/contexts/form/formContext"
import {  disponserFormValues, disponserSchema } from "./utils/puesta-disposicion"
import { SignaturePad } from "~/components/ui/signaturePad"


interface Props{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileValues?:any
}
export const PuestaDisposicionForm = ({profileValues}:Props) => {
  const { addData, IPHdata} = useContext(FormContext)

const form = useForm<disponserFormValues>({
    resolver: zodResolver(disponserSchema),
    defaultValues:IPHdata.puestaDisposicion,
    mode: "onSubmit",
});

  useEffect(() => {
    if(profileValues && profileValues.profile){
      form.setValue("names", profileValues.profile.names, {
        shouldDirty:true
      })
      form.setValue("fristsurname",profileValues.profile.fristsurname,
      {
        shouldDirty:true

      })
      form.setValue("lastsurname", profileValues.profile.lastsurname,{
        shouldDirty:true
      })
      form.setValue("rank", profileValues.profile.rank,{
        shouldDirty:true
      })
      form.setValue("assignment", profileValues.profile.assignment,{
        shouldDirty:true
      })
      form.setValue("signatureImg", profileValues.profile.signature,{
        shouldDirty:true
      })
    
    }
      form.setValue("names", IPHdata.puestaDisposicion.names, {
        shouldDirty:true
      })
      form.setValue("fristsurname",IPHdata.puestaDisposicion.fristsurname,
      {
        shouldDirty:true

      })
      form.setValue("lastsurname", IPHdata.puestaDisposicion.lastsurname,{
        shouldDirty:true
      })
      form.setValue("rank", IPHdata.puestaDisposicion.rank,{
        shouldDirty:true
      })
      form.setValue("assignment", IPHdata.puestaDisposicion.assignment,{
        shouldDirty:true
      })
      form.setValue("signatureImg", IPHdata.puestaDisposicion.signatureImg,{
        shouldDirty:true
      })
    
  }, [profileValues])

 

      const onSubmit: SubmitHandler<disponserFormValues> = async(data) => {
        if (form.getValues("signatureImg")) {
          
          addData("puestaDisposicion", {...data, signatureImg:form.getValues("signatureImg")}); 
          toast({
            title: "El formulario se ha guardado con exito.",
            description: "no  borres el almacenamiento local si aun no terminas el IPH",
            action: <ToastAction altText="cerrar">cerrar</ToastAction>,
          })
        }
        form.reset({}, { keepValues: true, keepDirtyValues:false });
      }
        
  


  return (
    <Form {...form}>
      
    <form  id="puesta-disposicion"  method="POST" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 h-full">
    
    <FormField
          control={form.control}
          name="names"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre(s):</FormLabel>
              <FormControl>
                <Input  className="border-slate-300" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
            
    <FormField
          control={form.control}
          name="fristsurname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primer apellido:</FormLabel>
              <FormControl>
                <Input  className="border-slate-300"{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
            
    <FormField
          control={form.control}
          name="lastsurname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Segundo Apellido:</FormLabel>
              <FormControl>
                <Input  className="border-slate-300"{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="assignment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adscripción:</FormLabel>
              <FormControl>
                <Input  className="border-slate-300"{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="rank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cargo:</FormLabel>
              <FormControl>
                <Input  className="border-slate-300" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />  

      <SignaturePad form={form}/>
            <Button 
           type="submit"   disabled={!form.formState.isDirty || form.watch("signatureImg") == ""}  className="float-right bg-cyan-900 text-white" variant="outline"  // Disable the button if the form is not dirty
           ><Save className="w-4 h-4 mr-2" /> Guardar sección</Button>    
    </form>
           

    </Form>
  )
}
