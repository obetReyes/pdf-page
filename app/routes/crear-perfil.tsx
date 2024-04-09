import { Profileform } from "~/forms/profile-form";

export default function CrearPerfil(){
    return (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="max-w-xl mx-auto">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                Completa tu Perfil
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                la informacion es neceseria para reducir el tiempo al momento de un IPH
              </p>
            </div>
    
            <div className="mt-12">
              <Profileform/>
            </div>
          </div>
        </div>
      );
}

