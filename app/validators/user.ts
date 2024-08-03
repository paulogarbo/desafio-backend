import { Role } from '#dto/constant'
import vine from '@vinejs/vine'

export const UserCreateSchema = vine.object({
  name: vine.string(),
  email: vine.string().email(),
  password: vine.string().trim(),
  registration: vine.string(),
  date_of_birth: vine.string(),
  role: vine.enum(Role).optional(),
})

export const UserUpdateSchema = vine.object({
  name: vine.string().optional(),
  email: vine.string().email().optional(),
  password: vine.string().trim().optional(),
  registration: vine.string().optional(),
  date_of_birth: vine.string().optional(),
  role: vine.enum(Role).optional(),
})

export const UserCreateValidator = vine.compile(UserCreateSchema)
export const UserUpdateValidator = vine.compile(UserUpdateSchema)
