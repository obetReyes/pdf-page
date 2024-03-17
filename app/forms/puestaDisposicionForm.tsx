/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from "@hookform/resolvers/zod"
import {  SubmitHandler, useForm } from "react-hook-form"
import { FormControl,  FormField, FormItem, FormLabel, FormMessage, Form } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Save, } from "lucide-react"
import { toast } from "~/components/ui/use-toast"
import { useContext, useEffect } from "react"
import useLocalStorage from "~/hooks/useLocalStorage"
import { SignatureCanvas } from "~/components/signature-canvas"
import { ToastAction } from "~/components/ui/toast"
import { FormContext } from "~/contexts/form/formContext"
import { initialDisponserValues, disponserFormValues, disponserSchema } from "./utils/puesta-disposicion"




export const PuestaDisposicionForm = () => {
  const {clean, setFormStorageClean} = useContext(FormContext)
  const [saveForm, setSaveForm] = useLocalStorage("/iph/puesta-a-disposicion");
  
const form = useForm<disponserFormValues>({
    resolver: zodResolver(disponserSchema),
    defaultValues:initialDisponserValues,
    mode: "onSubmit",
});


useEffect(() => {
    // Esperar hasta que saveForm tenga un valor válido antes de asignar formStoredData
    if (saveForm !== null) {
        form.setValue("assignment",  saveForm.assignment, {shouldDirty:false})
        form.setValue("fristsurname",  saveForm.fristsurname, {shouldDirty:false})
        form.setValue("lastsurname",  saveForm.lastsurname, {shouldDirty:false})
        form.setValue("names",  saveForm.names, {shouldDirty:false})
        form.setValue("rank",  saveForm.rank,{shouldDirty:false})
        form.setValue("isSignature",  saveForm.isSignature, {shouldDirty:false})
        form.setValue("signatureImg",  saveForm.signatureImg, {shouldDirty:false})
    }
}, [saveForm]);

     
    
      const onSubmit: SubmitHandler<disponserFormValues> = async(data) => {
        if (form.getValues("signatureImg")) {
          console.log("signatureImg", form.getValues("signatureImg"))

          setSaveForm({...data, signatureImg:form.getValues("signatureImg")});  
          toast({
            title: "El formulario se ha guardado con exito.",
            description: "no  borres el almacenamiento local si aun no terminas el IPH",
            action: <ToastAction altText="cerrar">cerrar</ToastAction>,
          })
        }
        form.reset({}, { keepValues: true, keepDirtyValues:false });
      }
        

      useEffect(() => {
        if(clean == true){
          form.reset()
          setFormStorageClean(false)
        }
      }, [clean])
      
  return (
    <Form {...form}>
    <form id="puesta-disposicion" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    
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

<SignatureCanvas form={form} />
       
            <Button 
            disabled={Object.keys(form.formState.dirtyFields).length == 0} type="submit" className="float-right bg-cyan-900 text-white" variant="outline"><Save className="w-4 h-4 mr-2" /> Guardar sección</Button>    
    </form>
           

    </Form>
  )
}
