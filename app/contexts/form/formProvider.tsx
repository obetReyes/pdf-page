/* eslint-disable @typescript-eslint/no-explicit-any */
import {useReducer, useState} from 'react'
import { FormContext } from './formContext'
import { FormReducer } from './formReducer'
import useLocalStorageState from '~/hooks/useLocalStorageState'
interface PROPS{
  children: JSX.Element | JSX.Element[]
}
export interface FORM_STATE{
    clean:boolean
} 
const INITIAL_STATE:FORM_STATE = {
    clean:false
}
export const FormProvider = ({children}:PROPS) => {
  const [state, dispatch] = useReducer(FormReducer, INITIAL_STATE )
  let IPH;

  if (typeof window !== 'undefined') {
    // Verificar si localStorage está disponible en el navegador
    IPH = localStorage.getItem("IPH");
  }
  
  const [IPHdata, setIPHdata, {removeItem}] = useLocalStorageState('IPH', {
    defaultValue: {
      puestaDisposicion:{
        assignment:  (typeof IPH == "string") ? JSON.parse(IPH).puestaDisposicion.assignment : "" ,
        fristsurname:(typeof IPH == "string") ? JSON.parse(IPH).puestaDisposicion.fristsurname : "",
        lastsurname:(typeof IPH == "string") ? JSON.parse(IPH).puestaDisposicion.lastsurname : "",
        names:(typeof IPH == "string") ? JSON.parse(IPH).puestaDisposicion.names : "",
        rank:(typeof IPH == "string") ? JSON.parse(IPH).puestaDisposicion.rank : "",
        signatureImg:(typeof IPH == "string") ? JSON.parse(IPH).puestaDisposicion.signatureImg : ""
      }
    }
})
const [query, setQuery] = useState<{ [key: string]: any }>({});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addData(key:string, data:any) {
  setQuery(prevQuery => ({
    ...prevQuery,
    [key]: data
  }));
  
  // Update the IPHdata with the new key-value pair
  setIPHdata(prevIPHdata => ({
    ...prevIPHdata,
    [key]: data
  }));

}

function removeData(){
  removeItem()
}

  const setFormStorageClean = (clean:boolean) => {
    dispatch({type:"setFormStorageClean", payload:clean})
  }

  return (
      <FormContext.Provider value={{...state,addData,removeData, setFormStorageClean, IPHdata}}>
          {children}
      </FormContext.Provider>
  )
}