import { AuthSignInSchema } from '#validators/auth'
import { Infer } from '@vinejs/vine/types'

export type AuthSignIn = Infer<typeof AuthSignInSchema>
