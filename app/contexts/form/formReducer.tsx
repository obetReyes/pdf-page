import { FORM_STATE } from "./formProvider"
type FORM_STORAGE_CLEAN_ACTION = {
    type:"setFormStorageClean"
    payload:boolean
}
export const FormReducer = (state:FORM_STATE, action:FORM_STORAGE_CLEAN_ACTION ): FORM_STATE => {
    switch(action.type){
        case "setFormStorageClean":
            return{
                ...state,
                clean:action.payload
            }
            
        default :
        return state
    }
}

