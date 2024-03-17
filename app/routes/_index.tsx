import type { MetaFunction } from "@remix-run/node";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (  
    <section className="hero w-full h-screen py-12 md:py-24 lg:py-32 xl:py-48">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
Gestión de reportes y evidencia. </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Gestiona fácilmente los datos en todas tus operaciones. centraliza los reportes y   organizan de manera inteligente   para eliminar la complejidad, cumple con los requisitos y mejorar la productividad.
          </p>
        </div>
      </div>
    </div>
  </section>
  );
}
