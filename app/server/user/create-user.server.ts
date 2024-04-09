import bcrypt from 'bcryptjs'
import { prisma } from '../prisma/prisma.server'
export type RegisterForm = {
  email: string
  password: string
  confirmPassword:string
}
export const createUser = async (user: RegisterForm) => {
  const passwordHash = await bcrypt.hash(user.password, 12)
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: passwordHash,
    },
  })
  return { id: newUser.id, email: user.email }
}
