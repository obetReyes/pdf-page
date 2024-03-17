import {useReducer} from 'react'
import { FormContext } from './formContext'
import { FormReducer } from './formReducer'
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
  
  
  const setFormStorageClean = (clean:boolean) => {
    dispatch({type:"setFormStorageClean", payload:clean})
  }

  return (
      <FormContext.Provider value={{...state, setFormStorageClean}}>
          {children}
      </FormContext.Provider>
  )
}