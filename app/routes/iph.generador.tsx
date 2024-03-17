import { LoaderFunctionArgs } from "@remix-run/node";
import { Loader } from "lucide-react";
import IPHLayout from "~/components/iph/iphLayout"
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import useLocalStorage from "~/hooks/useLocalStorage";
import ExcelJS from 'exceljs';

export async function loader() {
  const workbook = new ExcelJS.Workbook();
  workbook.xlsx.readFile('file.xlsx')//Change file name here or give file path
    const report = "hola";
    const pdf = `xd ${report}`;
    return new Response(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  }
  

  export default function Generador () {
    const [saveForm, setSaveForm] = useLocalStorage("/iph/puesta-a-disposicion");

    if(saveForm == null){
      <Loader/>
    }
    return (
      <IPHLayout>
        <div className='mb-3'>
          <h3 className="text-lg font-medium">Has completado los campos Requeridos</h3>
          
        </div>
        
        <section className="gap-2">
        <Button
        className="bg-slate-900 text-gray-100 float-right"
         variant="outline"
        >
          Descargar PDF
        </Button>
          <article>
            <div className="flex flex-wrap gap-2">
            <h1 className=" scroll-m-20 text-4xl font-extrabold tracking-tight  lg:text-5xl">
      {saveForm?.names ? saveForm.names : ""}

      </h1>
      <h1 className=" scroll-m-20 text-4xl font-extrabold tracking-tight  lg:text-4xl">
      {saveForm?.fristsurname ? saveForm.fristsurname : ""}
      </h1> 
      <h1 className=" scroll-m-20 text-4xl font-extrabold tracking-tight  lg:text-4xl ">
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
  
  