import { PuestaDisposicionForm } from "~/forms/puestaDisposicionForm"
import { IphLayout } from "~/components/iph/iphLayout"
export default function puestaDisposicion () {

  return (
<IphLayout>
<div className="lg:max-w-5xl mx-auto ">
      <div className='mb-3'>
        <h3 className="text-lg font-medium">PUESTA A DISPOSICIÓN</h3>
        <p className="text-sm text-muted-foreground">
        Datos de quien realiza la puesta a disposición
        </p>
      </div>
          <PuestaDisposicionForm/>
          </div>
    </IphLayout>
  )
}


