import { useReducer } from 'react';
import { signatureReducer,clearCanvas,startDrawing,draw,finishDrawing,prepareCanvas } from '~/reducers/signature-reducer';

export interface SIGNATURE_STATE{
    isDrawing: boolean;
    isImgLoaded: boolean;
  } 
  
  const INITIAL_STATE:SIGNATURE_STATE = {
    isDrawing:false,
    isImgLoaded:false,
  }


export const useSignaturePad = (canvasRef:React.RefObject<HTMLCanvasElement>, contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>) => {
    const [state, dispatch] = useReducer(signatureReducer, INITIAL_STATE)

    const initCanvas = (signaturePath?:string) => {
      dispatch({
        type:"PREPARE CANVAS",
        payload:prepareCanvas(state, canvasRef, contextRef,signaturePath,)
      })
    }


  const clearPad = () => {
    dispatch({
        type:"CLEAR CANVAS",
        payload:clearCanvas(canvasRef)  
      })
  }; 

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    dispatch({
        type:"START DRAWING",
        payload:startDrawing(state, canvasRef, contextRef, e)
      })
  };

  const drawing = ( e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    dispatch({
        type:"DRAW",
        payload:draw(state, e, contextRef)
      })
  };


  const finishDraw = () => {
    dispatch({
        type:"FINISH DRAWING",
        payload:finishDrawing(state, contextRef)
      })
  };

  return { clearPad, startDraw , drawing, finishDraw, initCanvas};
};
