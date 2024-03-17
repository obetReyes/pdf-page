import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node"; // or cloudflare/deno
import styles from "./tailwind.css";
import css from "./app.css"
import { cssBundleHref } from "@remix-run/css-bundle";
import { Navbar } from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";
import { FormProvider } from "./contexts/form/formProvider";
 
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: css },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
]
export default function App() {
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
        <Navbar/>
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
