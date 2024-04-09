import { BookOpenText, LandPlot, MessageSquareMore, NotebookPen, Siren,  Plus } from "lucide-react";
export interface IphSectionI{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon:any;
    href:string,
    label:string
}
export const iphSections:IphSectionI[] = [
    {
        icon:<NotebookPen className="w-4 h-4 mr-2"/>,
       label: "puesta  a disposicion",
        href: "/iph/puesta-a-disposicion",
      },
      {
        icon:<Siren className="w-4 h-4 mr-2" />,
       label: "primer respondiente",
        href: "/iph/primer-respondiente",
      },
      {
        icon:<BookOpenText className="w-4 h-4 mr-2"/>,
       label: "conocimiento del hecho",
        href: "/iph/conocimiento-del-hecho",
      },
      {
        icon:<LandPlot className="w-4 h-4 mr-2" />,
       label: "lugar de la intervencion",
        href: "/iph/lugar-intervencion",
      },
      {
        icon:<MessageSquareMore className="w-4 h-4 mr-2"/>,
       label: "narrativa de los hechos",
        href: "/iph/narrativa-hechos",
      },
      {
        icon:<Plus className="w-4 h-4 mr-2"/>,
       label: "anexos",
        href: "/iph/anexos",
      },
]

