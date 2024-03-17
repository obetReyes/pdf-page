import IPHLayout from "~/components/iph/iphLayout"
import { PuestaDisposicionForm } from "~/forms/puestaDisposicionForm"

export default function puestaDisposicion () {

  return (
    <IPHLayout>
      <div className='mb-3'>
        <h3 className="text-lg font-medium">PUESTA A DISPOSICIÓN</h3>
        <p className="text-sm text-muted-foreground">
        Datos de quien realiza la puesta a disposición
        </p>
      </div>
      
          <PuestaDisposicionForm/>
    </IPHLayout>
  )
}


