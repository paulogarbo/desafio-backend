import ApplicationException from '#exceptions/application'
import UserService from '#services/user'
import { UserCreateValidator, UserUpdateValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UserController {
  constructor(private userService: UserService) {}

  async show({ request, response }: HttpContext) {
    const { id } = request.params()
    if (!id) {
      throw new ApplicationException('Id is required', {
        status: 422,
        code: 'ID_REQUIRED',
        cause: 'Id is required',
      })
    }

    const result = await this.userService.show(id)
    return response.ok(result)
  }

  async paginate({ response }: HttpContext) {
    const result = await this.userService.paginate()
    return response.ok(result)
  }

  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(UserCreateValidator)
    const result = await this.userService.create(payload)
    return response.created(result)
  }

  async update({ request, response }: HttpContext) {
    const { id } = request.params()
    if (!id) {
      throw new ApplicationException('Id is required', {
        status: 422,
        code: 'ID_REQUIRED',
        cause: 'Id is required',
      })
    }
    const payload = await request.validateUsing(UserUpdateValidator)
    const result = await this.userService.update(id, payload)
    return response.ok(result)
  }

  async delete({ request, response }: HttpContext) {
    const { id } = request.params()
    if (!id) {
      throw new ApplicationException('Id is required', {
        status: 422,
        code: 'ID_REQUIRED',
        cause: 'Id is required',
      })
    }
    const result = await this.userService.delete(id)
    return response.ok(result)
  }

  async classrooms({ request, response }: HttpContext) {
    const { id } = request.params()
    if (!id) {
      throw new ApplicationException('Id is required', {
        status: 422,
        code: 'ID_REQUIRED',
        cause: 'Id is required',
      })
    }
    const result = await this.userService.classrooms(id)
    return response.ok(result)
  }
}
