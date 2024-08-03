import { UserCreateSchema, UserUpdateSchema } from '#validators/user'
import { Infer } from '@vinejs/vine/types'

export type UserCreate = Infer<typeof UserCreateSchema>
export type UserUpdate = Infer<typeof UserUpdateSchema>
