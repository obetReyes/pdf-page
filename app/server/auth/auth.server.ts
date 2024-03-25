// app/services/auth.server.ts
import { Authenticator, AuthorizationError } from "remix-auth";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import { prisma } from "../prisma/prisma.server";
import bcrypt from "bcrypt"
import { User } from "@prisma/client";
// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
    new FormStrategy(async ({ form }) => {
      const email = form.get("email") as string;
      const password = form.get("password") as string;
      
      const user = await prisma.user.findUnique({
        where:{
          email:email
        }
      })

      if(!user){
        throw new AuthorizationError("usuario invalido")
      }
     
      const passwordMatch = bcrypt.compare(password, user.password as string)

      if(!passwordMatch){
        throw new AuthorizationError("usuario invalido")
      }
      // the type of this user must match the type you pass to the Authenticator
      // the strategy will automatically inherit the type if you instantiate
      // directly inside the `use` method
      return user;
    }),
    // each strategy has a name and can be changed to use another one
    // same strategy multiple times, especially useful for the OAuth2 strategy.
    "user-pass"
  );