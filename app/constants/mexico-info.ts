import mexicoData from "./mexico.json"

export const states = mexicoData.estados.map(state => state)
export const municipalities = (stateName: string) => {
    const targetState = mexicoData.estados.find(state => state.estado === stateName);
    const stateMunicipalities = mexicoData.municipios.filter(municipality => municipality.clave_entidad === targetState?.clave_entidad); 
    return stateMunicipalities

  };
  
  
export const institutions = ["Guardia Nacional","Policía Federal Ministerial","Policía Ministerial","Policía Mando Único","Policía Estatal","Policía Municipal"]
