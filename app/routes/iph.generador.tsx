/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSubmit } from "@remix-run/react";
import { ActionFunctionArgs, json} from "@remix-run/node";
import { Loader } from "lucide-react";
import IPHLayout from "~/components/iph/iphLayout"
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import useLocalStorage from "~/hooks/useLocalStorage";
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import qs from "qs"
import { useEffect } from "react";

  export default function Generador () {
    const [saveForm, setSaveForm] = useLocalStorage("/iph/puesta-a-disposicion");
    useEffect(() => {
      console.log("saveform", saveForm)
    },[saveForm])
    if(saveForm == null){
      <Loader/>
    }
    return (
      <IPHLayout>
        <div className='mb-3'>
          <h3 className="text-lg font-medium">Has completado los campos Requeridos</h3>
          
        </div>
        
        <section className="gap-2">
         
          <form method="post"  encType="application/json">
                        <input
    type="hidden"
    name="json"
    value={JSON.stringify(saveForm)}
  />
          <Button
          type="submit"
        className="bg-slate-900 text-gray-100 float-right"
         variant="outline"
        >
          Descargar PDF
        </Button>
          </form>
       
          <article>
            <div className="flex flex-wrap gap-2">
            <h1 className=" scroll-m-20 text-4xl font-extrabold tracking-tight  lg:text-5xl">
      {saveForm?.names ? saveForm.names : ""}

      </h1>
      <h1 className=" scroll-m-20 text-4xl font-extrabold tracking-tight  lg:text-4xl">ActionFunctionArgs
      {saveForm?.lastsurname ? saveForm.lastsurname : ""}
      </h1> 

            </div>
          
      <Separator/>
      <section className="flex  mt-4  gap-2 ">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {saveForm?.rank ? saveForm.rank : ""}
      </h4>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">

      {saveForm?.assignment ? saveForm.assignment : ""}
      </h4>
      </section>
      <img width={400} height={200} src={saveForm?.signatureImg ? saveForm.signatureImg  : ""} alt="firma"/>
          </article>
        </section>
     
      
      </IPHLayout>
    )
  }
  
  
  export async function action({
    request,
  }: ActionFunctionArgs) {
    const formData = await request.formData();
    const obj = JSON.parse(formData.get("json") as any);
    console.log(obj.names)
    return "hola`"
  }