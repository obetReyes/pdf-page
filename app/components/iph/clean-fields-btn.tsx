import { useContext } from "react";
import { FormContext } from "~/contexts/form/formContext";
import { Eraser } from "lucide-react";

interface PropsI{
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}
export const CleanFieldsBtn = ({setOpen}:PropsI) => {
  const {removeData} = useContext(FormContext);
  
    return (
      <button  onClick={() => {
        if(setOpen){
          setOpen(false)
        }
        removeData();
      }} className=" p-2 mt-2 md:mt-0   text-white bg-red-800 shadow-xl shadow-red-900/50 hover:bg-red-700  flex items-center   rounded  ">
        <Eraser  className="w-4 h-4 mr-2"/>
      borrar secciones
 </button>
  )
}

