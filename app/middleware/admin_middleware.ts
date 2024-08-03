import { Role } from '#dto/constant'
import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'

export default class UserIsAdminMiddleware {
  async handle({ auth }: HttpContext, next: NextFn) {
    const { user } = auth // get user from token

    if (!user) throw Error('User not found')

    if (user?.role !== Role.ADMIN) throw Error('Access not permitted')

    await next()
  }
}
