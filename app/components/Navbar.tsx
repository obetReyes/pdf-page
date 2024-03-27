import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";


import { Menu } from "lucide-react";
import { Link } from "@remix-run/react";
import { DynamicLinks } from "./dynamic-links";
interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "/",
    label: "Inicio",
  },
  {
    href: "/",
    label: "Caracteristicas",
  },
  {
    href: "/",
    label: "Herramientas",
  },
  {
    href: "/",
    label: "Soporte",
  },
];





export const Navbar = () => {
  return (
<header className="sticky inset-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-lg">
    <nav className="mx-auto flex lg:w-10/12 gap-8 px-6 transition-all duration-200 ease-in-out lg:px-12 py-4">
        <div className="relative flex items-center">
            <a href="/">
                <h1 className="scroll-m-20 text-xl font-extrabold uppercase tracking-wide lg:text-2xl">Eclipse</h1>
             </a>
        </div>
        <ul className="hidden items-center justify-center gap-6 md:flex">
            {routeList.map((route) => {
                return(
                    <li key={route.label} className="pt-1.5 font-dm text-sm font-medium text-slate-700">
                    <Link to={route.href}>{route.label}</Link>
                </li>
                )
            })}
        </ul>
        <div className="flex-grow"></div>
        <div className="hidden items-center justify-center gap-6 md:flex">
            <a href="/" className="font-dm text-sm font-medium text-foreground underline">Contacto</a>
            <DynamicLinks/>
        </div>
        <Sheet>
  <SheetTrigger className="md:hidden"><Menu className="w-6 h-6"/></SheetTrigger>
  <SheetContent side="left">
    <SheetHeader className="my-6">
      <SheetTitle>ECLIPSE</SheetTitle>

    </SheetHeader>
    <ul className="gap-4 flex flex-col w-full">
            {routeList.map((route) => {
                return(
                    <li key={route.label} className="w-full block pt-2 font-dm text-sm font-medium text-slate-700">
                    <a href={route.href}>{route.label}</a>
                </li>
                )
            })}
        </ul>
        <div className="flex flex-col gap-4 mt-8">
        <a href="/" className="font-dm text-sm font-medium text-foreground underline">Contacto</a>
            <a href="iph/generariph"
                className="rounded-md bg-gradient-to-br bg-foreground px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md transition-transform duration-200 ease-in-out hover:scale-[1.03]">
                Generar IPH
            </a>
            <DynamicLinks/>

        </div>
        
  </SheetContent>
</Sheet>
    </nav>
</header>
  );
};