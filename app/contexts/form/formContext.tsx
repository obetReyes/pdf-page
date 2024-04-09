/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react"

export interface FORM_CONTEXT_PROPS{
    clean:boolean
    setFormStorageClean: (clean: boolean) => void
    addData(key: string, data: any): void
    removeData(): void
    IPHdata: {
        puestaDisposicion:{
            assignment: string,
            fristsurname:string,
            lastsurname:string,
            names:string,
            rank:string,
            signatureImg:string
          }
    }
}

export const FormContext = createContext<FORM_CONTEXT_PROPS>
({}  as FORM_CONTEXT_PROPS)