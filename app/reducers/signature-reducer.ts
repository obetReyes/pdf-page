import { SIGNATURE_STATE } from "~/components/signature-canvas"
type prepareCanvas = {
    type:"PREPARE CANVAS"
    payload: void
}

type startDrawing = {
    type:"START DRAWING"
    payload:void
}
type draw = {
    type:"DRAW"
    payload: void
}
type finishDrawing = {
    type:"FINISH DRAWING"
    payload:void
}
type clearCanvas = {
  type:"CLEAR CANVAS"
  payload:void
}


  // Our reducer function that uses a switch statement to handle our actions
export function signatureReducer(state:SIGNATURE_STATE, action:draw | clearCanvas | finishDrawing | startDrawing | prepareCanvas) {
    switch (action.type) {
      case "PREPARE CANVAS":
            return {...state, prepareCanvas}
            
      case  "START DRAWING":
        return {...state, startDrawing}
            
      case  "DRAW":
          return {...state, draw}
              
      case  "FINISH DRAWING":
          return {...state, finishDrawing}
      
      case  "CLEAR CANVAS":
            return {...state, clearCanvas}
                  
                
      default:
        return state;
    }
  }
  
export function prepareCanvas(state:SIGNATURE_STATE, canvasRef:React.RefObject<HTMLCanvasElement>, contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>
  ){
    const canvas = canvasRef.current;
    const signatureSaved = localStorage.getItem("/iph/puesta-a-disposicion");
    
    if (canvas) {
      const rect = canvas.parentElement?.getBoundingClientRect(); // Obtener el tamaño del contenedor
      if (rect) {
        canvas.width = rect.width; // Establecer el ancho del canvas según el contenedor
        canvas.height = rect.height; // Establecer la altura del canvas según el contenedor
        canvas.style.width = `${rect.width}px`; // Establecer el ancho del canvas para que se ajuste
        canvas.style.height = `${rect.height}px`; // Establecer la altura del canvas para que se ajuste
      }
        const context = canvas.getContext("2d");
        if (context) {
          context.scale(1, 1);
          context.lineCap = "round";
          context.lineJoin = "round"
          context.imageSmoothingEnabled = true
          context.strokeStyle = "black";
          context.lineWidth = 0.5;
          contextRef.current = context;
  
          if(signatureSaved){
            const SignatureSavedParsed = JSON.parse(signatureSaved);
            const image = new Image();
            image.src =  SignatureSavedParsed.signatureImg;
            image.onload = () => {
              state.isImgLoaded = true
              if(context)
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
          };   
          }
          
        }
       
      }
}

export const startDrawing = (state:SIGNATURE_STATE, canvasRef:React.RefObject<HTMLCanvasElement>, contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>, event: React.MouseEvent<HTMLCanvasElement>) => {
  const { offsetX, offsetY } = event.nativeEvent;
  if (contextRef.current) {
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    state.isDrawing = true ;
    if(state.isImgLoaded){
      state.isImgLoaded = false
      clearCanvas(canvasRef)
    }
  }
};

export const draw = (state:SIGNATURE_STATE, event: React.MouseEvent<HTMLCanvasElement>, contextRef:React.MutableRefObject<CanvasRenderingContext2D | null>) => {
  if (!state.isDrawing || !contextRef.current ) {
    return;
  }
  const { offsetX, offsetY } = event.nativeEvent;
  contextRef.current.lineTo(offsetX, offsetY);
  contextRef.current.stroke();
};

export const finishDrawing = (state:SIGNATURE_STATE, contextRef:React.MutableRefObject<CanvasRenderingContext2D | null>) => {
  if (contextRef.current) {
    contextRef.current.closePath();
    state.isDrawing  = false;
  }
}

export const clearCanvas = ( canvasRef:React.RefObject<HTMLCanvasElement>) => {
  const canvas = canvasRef.current;
  if (canvas) {
    const context = canvas.getContext("2d");
    if (context) {
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }


};