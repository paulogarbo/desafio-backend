import vine from '@vinejs/vine'

export const AuthSignInSchema = vine.object({
  email: vine.string(),
  password: vine.string(),
})
