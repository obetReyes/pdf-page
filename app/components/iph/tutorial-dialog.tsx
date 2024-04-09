import { QuestionMarkIcon } from "@radix-ui/react-icons"
import {  Button, 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,} from "../ui"
import { Link } from "@remix-run/react"
import { Eraser, Pickaxe } from "lucide-react"


export function TutorialDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="!z-50 float-right p-4 bg-slate-800 hover:bg-slate-700 cursor-pointer  rounded-full shadow-lg  fixed bottom-4 right-4"><QuestionMarkIcon className="w-6 h-6 fill-white text-white  hover:text-gray-300" /></Button>
      </DialogTrigger>
      <DialogContent  className="w-[300px] md:w-auto h-[300px] md:h-[600px]  overflow-auto">
        <DialogHeader>
          <DialogTitle className="scroll-m-20 text-xl md:text-4xl font-extrabold tracking-tight lg:text-5xl">Informacion</DialogTitle>
          <DialogDescription className="scroll-m-10 md:scroll-m-20 text-lg  tracking-tight">
          para poder generar el informe policial Homologado necesitas llenar y guardar cada una de las secciones las cuales se pueden acceder por medio del menu al lado  izquierdo del formulario o si estas en movil por medio del boton a la derecha de secciones del iph, la seccion de anexos no es estrictamente necesaria para poder generar un IPH ya que esta depende estrictamente de las actuaciones del evento.
          <br/>
          <br/>
          al terminar el llenado aparecera un boton en el menu  para poder generar el documento
          <br/>
          <button disabled={true}
         className="mt-4 flex items-center  text-white bg-slate-700 shadow-slate-800/50 rounded shadow-xl p-2" >
         <Pickaxe  className="w-4 h-4 mr-2" />
         generar documento
      </button>
        al dar click en esa seccion podras descargar el informe en formato pdf 
        <br/>
        <br/>
        el boton borrrar secciones limpia  todos los campos de cada una de las secciones que han sido llenadas
        <button  className=" p-2 mt-2 md:mt-0   text-white bg-red-800 shadow-xl shadow-red-900/50 hover:bg-red-700  flex items-center   rounded  ">
        <Eraser  className="w-4 h-4 mr-2"/>
      borrar secciones
 </button>
          </DialogDescription>
        </DialogHeader>
        <div>
        <blockquote className="mt-6 border-l-2 pl-6 italic">
        cada una de las secciones del menu estan disenadas para que el llenado sea mas fluido y especifico.
        <br/>
        <br/>
        las secciones guardadas se van almacenando en la memoria local del navegador por lo tanto no se borra al cerrar las pestana  del navegador pero si se borrara si se limpia la memoria local Storage del navegador 
        <br/><br/><b  className="font-bold">importante: se cumplen con todos los requisitos y campos  includios en el documento oficial proporcionado por el <Link  className="underline" to="https://www.gob.mx/sesnsp/documentos/iph-informe-policial-homologado?state=published" target="_blank" rel="noreferrer">Secretariado Ejecutivo del Sistema Nacional de Seguridad Pública </Link></b>
    </blockquote>
    
     
        </div>
        
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
