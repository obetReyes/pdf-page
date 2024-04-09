import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node"; // or cloudflare/deno
import styles from "./tailwind.css";
import css from "./app.css"
import { cssBundleHref } from "@remix-run/css-bundle";
import { Navbar } from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";
import { FormProvider } from "./contexts/form/formProvider";
import { getUser } from "./server/auth/auth.server";
 
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: css },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
]
export const loader: LoaderFunction = async ({ request }) => {
  const isUser = await getUser(request) ? true :false
  return isUser
  // If there's already a user in the session, redirect to the home page
  }
  
export default function App() {
  const isUser:boolean = useLoaderData()
  const {pathname} = useLocation()

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      
      <body>
      <FormProvider>
      {pathname !== "/crear-perfil" && pathname !== "/iph/crear"   ? <Navbar isUser={isUser} /> : <></>}
        <Outlet />
        <Toaster />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        </FormProvider>
      </body>
      
    
    </html>
  );
}
