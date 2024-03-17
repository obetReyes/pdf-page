/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useReducer, useRef } from 'react'
import { UseFormReturn } from 'react-hook-form';
import { clearCanvas, draw, finishDrawing, prepareCanvas, signatureReducer, startDrawing } from '~/reducers/signature-reducer';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { FormContext } from '~/contexts/form/formContext';

export interface IphDisposicionPropsI{
  form:UseFormReturn<{
    names: string;
    fristsurname: string;
    lastsurname: string;
    assignment: string;
    rank: string;
    isSignature: boolean;
    signatureImg?:string | undefined
}, any, undefined>
}

export interface SIGNATURE_STATE{
  isDrawing: boolean;
  isImgLoaded: boolean;
} 

const INITIAL_STATE:SIGNATURE_STATE = {
  isDrawing:false,
  isImgLoaded:false,
}
export const SignatureCanvas = ({form}:IphDisposicionPropsI) => {
  const {clean} = useContext(FormContext)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);  
  const [state, dispatch] = useReducer(signatureReducer, INITIAL_STATE)

  useEffect(() => {
    dispatch({
      type:"PREPARE CANVAS",
      payload:prepareCanvas(state, canvasRef, contextRef)
    })
  }, [])

  useEffect(() => {
    if(form.getValues("isSignature") == true){
      
      if(canvasRef.current){
      const imgToSave = canvasRef.current.toDataURL()
      form.setValue("signatureImg", imgToSave)
    }
    }
  }, [form.formState.isSubmitting])
  
  useEffect(() => {
      if(clean ==  true){
        clearCanvas(canvasRef)
      }
  }, [clean])

  
  return (

    <FormField
      control={form.control}
      name='isSignature'
      render={() => 
      <FormItem>
        <FormLabel>Firma:</FormLabel>
        <Button type='button' onClick={() => {
          form.setValue("isSignature", false, {shouldDirty:false})
          form.setValue("signatureImg", "", {shouldDirty:false})
          dispatch({
            type:"CLEAR CANVAS",
            payload:clearCanvas(canvasRef)  
          })
        }}
        className="float-right bg-primary text-white" variant="outline"
         >
<Trash2 className="w-4 h-4 mr-2" /> borrar firma
        </Button>
        <FormControl>
        <canvas
    
    className="mt-2 w-full !object-contain  !border  rounded !border-slate-300"
    onMouseDown={(e) => {
      dispatch({
        type:"START DRAWING",
        payload:startDrawing(state, canvasRef, contextRef, e)
      })
      form.setValue("isSignature", true, {
        shouldDirty:true
      })
    }}
    onMouseUp={() => {dispatch({
      type:"FINISH DRAWING",
      payload:finishDrawing(state, contextRef)
    })
  }}
    onMouseLeave={() => {
      dispatch({
        type:"FINISH DRAWING",
        payload:finishDrawing(state, contextRef)
      })
    } }

    onMouseMove={(e) => {
      dispatch({
        type:"DRAW",
        payload:draw(state, e, contextRef)
      })
    }}
    ref={canvasRef}

    />
        </FormControl>
        <FormMessage/>
      </FormItem>
    } 
    />
  )
}
