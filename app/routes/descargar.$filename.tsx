/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoaderFunctionArgs} from "@remix-run/node";
import path from "path"
import fs from "fs"


const basePath = "/home/obetreyes/Documents/eclipseBusiness";


export async function loader({
    params,
  }: LoaderFunctionArgs) {
  
    const { filename } = params;
    const file = path.join(basePath, `pdfs/IPH-DELITOS-${filename}.pdf`);
    
    if (!fs.existsSync(file)) {
        return new Response("File not found", { status: 404 });
    }

    try {
        // Leer el archivo PDF existente
        const existingPdfBytes = await fs.promises.readFile(file);

        // Cargar el PDF existente

        // Devolver el PDF modificado como respuesta
        return new Response(existingPdfBytes, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment;filename=IPH-DELITOS${filename}.pdf`
            }
        });
    } catch (error) {
        console.error("Error al procesar el archivo PDF:", error);
        return new Response("Error interno del servidor", { status: 500 });
    }
}