import { AuthSignIn } from '#dto/auth'
import ApplicationException from '#exceptions/application'
import AuthRepository from '#repositories/auth'
import UserRepository from '#repositories/user'
import { inject } from '@adonisjs/core'

@inject()
export default class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository
  ) {}

  async signIn(payload: AuthSignIn) {
    const user = await this.userRepository.findByEmail(payload.email)
    if (!user)
      throw new ApplicationException('User not found', {
        status: 404,
        code: 'USER_NOT_FOUND',
        cause: 'User not found',
      })

    const isValid = await this.authRepository.verify({ user, password: payload.password })
    if (!isValid)
      throw new ApplicationException('Invalid credentials', {
        status: 401,
        code: 'INVALID_CREDENTIALS',
        cause: 'Invalid credentials',
      })

    return await this.authRepository.create(user)
  }
}
