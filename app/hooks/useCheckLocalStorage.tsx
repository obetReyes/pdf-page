/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"

export const useCheckLocalStorage = (localStorageSize:number) => {
    const [isFilled, setIsFilled] = useState<boolean>(false)
    const [canClean, setCanCLean]  = useState<boolean>(false)

    useEffect(() => {
        for (const key in localStorage){
            if(localStorage.length > localStorageSize){
                setIsFilled(true)
            }
            if(localStorage.length > localStorageSize){
                setCanCLean(true)
            }
         }
    },[isFilled, localStorageSize])
    return{
        isFilled,
        canClean
    }
}
