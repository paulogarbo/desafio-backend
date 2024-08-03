import AuthService from '#services/auth'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  async signIn({ request, response }: HttpContext) {
    const payload = request.only(['email', 'password'])
    const result = await this.authService.signIn(payload)
    return response.created(result)
  }
}
