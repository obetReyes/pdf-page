// app/services/auth.server.ts
import { prisma } from "../prisma/prisma.server";
import { RegisterForm, createUser } from "../user/create-user.server";// 
import bcrypt from "bcryptjs"
import { json, createCookieSessionStorage, redirect } from '@remix-run/node'

// ...
type LoginForm = {
  email: string
  password: string
}
const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set')
}


const storage = createCookieSessionStorage({
  cookie: {
    name: 'kudos-session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: undefined,
    httpOnly: true,
  },
})

export async function register(user: RegisterForm) {
  const exists = await prisma.user.count({ where: { email: user.email } });
  if (exists) {
    return json(
      { error: `User already exists with that email` },
      { status: 400 }
    );
  }

  const newUser = await createUser(user);
  if (!newUser) {
    return json(
      {
        error: `Something went wrong trying to create a new user.`,
        fields: { email: user.email, password: user.password },
      },
      { status: 400 }
    );
  }

  return redirect("/ingreso")

}


export async function createUserSession(id: string, redirectTo: string) {
  const session = await storage.getSession()
  session.set('userId', id)
 
  
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  })
}


export async function login({ email, password }: LoginForm) {
  const user = await prisma.user.findUnique({
    where: { email },
  });



  if (!user || !(await bcrypt.compare(password, user.password)))
    return json({ error: `el usuario no es valido` }, { status: 400 });


  if(user.fristlogin == null || user.fristlogin == false){
      await prisma.user.update({
        where:{
          id:user.id
        },
        data:{
          fristlogin:true
        }
      })
      return createUserSession(user.id, "/crear-perfil");
  }
  return createUserSession(user.id, "/iph/panel");
}


export async function requireUserId(request: Request, redirectTo: string = new URL(request.url).pathname) {
  const session = await getUserSession(request)
  
  const userId = session.get('userId')
  const url = new URL(request.url);

  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
    throw redirect(`/ingreso?${searchParams}`)
  }
  if(!url.pathname.includes("perfil")){

  const isProfile = await prisma.profile.findUnique({
    where:{
      userId:userId
    }
  })
  
  if(userId && typeof userId == 'string' && isProfile == null  ){
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
    throw redirect(`/crear-perfil?${searchParams}`)
  }
    }
    return userId
}


function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'))
}

async function getUserId(request: Request) {
  const session = await getUserSession(request)
  const userId = session.get('userId')
  if (!userId || typeof userId !== 'string') return null
  return userId
}

export async function getUser(request: Request) {
  const userId = await getUserId(request)
  if (typeof userId !== 'string') {
    return null
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    })
    return user
  } catch {
    throw logout(request)
  }
}

export async function logout(request: Request) {
  const session = await getUserSession(request)
  return redirect('/ingreso', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  })
}