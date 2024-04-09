/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect,useRef } from 'react'
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Button } from './button';
import { Trash2 } from 'lucide-react';
import { FormContext } from '~/contexts/form/formContext';
import { useSignaturePad } from '~/hooks/useSignaturePad';

export interface IphDisposicionPropsI{
  form:UseFormReturn<{
    names: string;
    fristsurname: string;
    lastsurname: string;
    assignment: string;
    rank: string;
    signatureImg:string 
}, any, undefined>
}

export const SignaturePad = ({form}:IphDisposicionPropsI) => {
  const {clean} = useContext(FormContext)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);  
  const {initCanvas, clearPad,drawing,finishDraw,startDraw} = useSignaturePad(canvasRef, contextRef)
  

  useEffect(() => {
    initCanvas(form.getValues("signatureImg"))
  }, [form.watch("signatureImg")])
   
  useEffect(() => {
    if (form.formState.isSubmitting) {
      // Ensure that isSignatureImg has the correct condition to trigger the effect
      const isSignatureImg = form.getValues("signatureImg");
      if (isSignatureImg && isSignatureImg.length > 0 && canvasRef.current) {
        const imgToSave = canvasRef.current.toDataURL();
        form.setValue("signatureImg", imgToSave, {
          shouldDirty: false,
        });
      }
    }
  }, [form.formState.isSubmitting, form.getValues("signatureImg")]); // Ensure isSignatureImg is in the dependency array
  
  
  useEffect(() => {
      if(clean ==  true){
        clearPad()
      }
  }, [clean])

  
  return (

    <FormField
    control={form.control}
    name="signatureImg"
      render={() => (<FormItem>
        <FormLabel>Firma:</FormLabel>
        <Button  onClick={() => {
          clearPad();
          form.setValue("signatureImg", "", {shouldDirty:false});
        } }
          className="float-right bg-primary text-white" variant="outline"
        >
          <Trash2 className="w-4 h-4 mr-2" /> borrar firma
        </Button>
        <FormControl>
          <canvas

            className="mt-2 w-full h-80 !object-contain  !border  rounded !border-slate-300"
            onMouseDown={(e) => {
              startDraw(e);
              form.setValue("signatureImg", "affs", {
                shouldDirty:true
              })
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
        </FormControl>
        <FormMessage />
      </FormItem>)}    />
  )
}