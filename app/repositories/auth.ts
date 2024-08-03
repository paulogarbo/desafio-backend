import Model from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthRepository {
  constructor() {}

  // criação de token de acesso
  async create(payload: Model) {
    const credential = await Model.tokens.create(payload)
    const { token, type } = credential?.toJSON()
    return { token, type }
  }

  // verificação de token de acesso
  async verify(payload: { user: Model; password: string }) {
    return hash.verify(payload.user.password, payload.password!)
  }
}
