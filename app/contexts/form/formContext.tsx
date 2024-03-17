import { createContext } from "react"

export interface FORM_CONTEXT_PROPS{
    clean:boolean
    setFormStorageClean: (clean: boolean) => void
}

export const FormContext = createContext<FORM_CONTEXT_PROPS>
({}  as FORM_CONTEXT_PROPS)