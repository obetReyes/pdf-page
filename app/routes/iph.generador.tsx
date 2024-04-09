/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader } from "lucide-react";
import { IphLayout } from "../components/iph/iphLayout"
import {useLocalStorage} from "~/hooks/";
import { useEffect, useState } from "react";
import { Link, useActionData } from "@remix-run/react";
import { Button, Separator } from "../components/ui";
import fs from "fs"
import path from "path"
import { PDFDocument } from "pdf-lib";
import { IPH } from "~/types/iph-fields";
import { ActionFunctionArgs } from "@remix-run/node";
import { v4 as uuidv4 } from 'uuid';
import { getUser } from "~/server/auth/auth.server";
const basePath = "/home/obetreyes/Documents/eclipseBusiness";



export async function action({
  request,
}: ActionFunctionArgs) {
  const body = await request.formData();
  const user = await getUser(request);
  const json = JSON.parse(body.get("json") as string)
  const data:IPH = json 
  const file = path.join(basePath, `pdfs/IPH-DELITOS.pdf`);
  
  if(!user){
    throw new Response("el usuario no es valido", {
      status:403
    })
  }
  console.log("action called post  rpfile")
  try {
    // Leer el archivo PDF existente
    const existingPdfBytes = await fs.promises.readFile(file);

    // Cargar el PDF existente
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Modificar el campo del formulario
    const form = pdfDoc.getForm();
    const fristSurnameField = form.getTextField('primer_respondiente_primer_apellido');

    fristSurnameField.setText(data.puestaDisposicion.fristsurname);
    form.flatten();

    // Guardar el PDF modificado como un blob
    const modifiedPdfBytes = await pdfDoc.save();
    modifiedPdfBytes
    // Devolver el PDF modificado como respuesta
    const filename = `${user.id,uuidv4()}`
    const outputPath = path.join(basePath, 'pdfs', `IPH-DELITOS-${filename}.pdf`);
    fs.writeFileSync(outputPath, modifiedPdfBytes);

  
  return filename;
} catch (error) {
    console.error("Error al procesar el archivo PDF:", error);
    return error;
}
}

  export default function Generador () {
    const PDFdocument = useActionData<typeof action>();

    const [saveForm, setSaveForm] = useLocalStorage("/iph/puesta-a-disposicion");
    if(saveForm == null){
      <Loader/>
    }

    const [fields, setFields] = useState<any>()
    
    
    useEffect(() => {
          
        setFields({
          puestaDisposicion:JSON.parse(localStorage.getItem("/iph/puesta-a-disposicion")!)
        })
    }, [])

    return (
      <IphLayout>
        <div className='mb-3'>
          <h3 className="text-lg font-medium">Has completado los campos Requeridos</h3>
          
        </div>
        
        <section className="gap-2">
        
          {PDFdocument ? 
        <Link
          to={`/descargar/${PDFdocument}`}
          onClick={() => localStorage.clear()}
          type="submit"
        className="bg-slate-900 text-gray-100 float-right"
        reloadDocument
        >
          <Button variant="ghost">
              Descargar IPH
          </Button>
        
        </Link> : 
        
        <form method="post"  encType="application/json">
        <input
type="hidden"
name="json"
value={JSON.stringify(fields)}
/>
<Button
          
          type="submit"
        className="bg-slate-900 text-gray-100 float-right"
        variant="link"
        >
         generar PDF
        </Button>
</form>
       }

        
       
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
     
      
      </IphLayout>
    )
  }
  

