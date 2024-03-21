import { useContext } from "react";
import { Button } from "../ui/button";
import { FormContext } from "~/contexts/form/formContext";

interface PropsI{
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}
export const CleanFieldsBtn = ({setOpen}:PropsI) => {
  const {setFormStorageClean} = useContext(FormContext)
  
    return (
      <Button  onClick={() => {
        if(setOpen){
          setOpen(false)
        }
       localStorage.clear();
      setFormStorageClean(true)
      }} variant="link" className=" w-full mt-2 md:mt-0   p-6 text-white bg-red-800 hover:bg-red-700">
      limpiar los datos almacenados
 </Button>
  )
}

