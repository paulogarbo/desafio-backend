import ApplicationException from '#exceptions/application'
import ClassRoomService from '#services/classroom'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ClassRoomController {
  constructor(private classRoomService: ClassRoomService) {}

  async show({ request, response }: HttpContext) {
    const { id } = request.params()
    if (!id) {
      throw new ApplicationException('Id is required', {
        status: 422,
        code: 'ID_REQUIRED',
        cause: 'Id is required',
      })
    }

    const result = await this.classRoomService.show(id)
    return response.ok(result)
  }

  async create({ request, response }: HttpContext) {
    const payload = request.only(['identifier', 'capacity'])
    const result = await this.classRoomService.create(payload)
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

    const payload = request.only(['identifier', 'capacity'])
    const result = await this.classRoomService.update(id, payload)
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
    const result = await this.classRoomService.delete(id)
    return response.ok(result)
  }

  async addUser({ request, response }: HttpContext) {
    const { id } = request.params()
    if (!id) {
      throw new ApplicationException('Id is required', {
        status: 422,
        code: 'ID_REQUIRED',
        cause: 'Id is required',
      })
    }
    const payload = request.only(['user_id'])
    const result = await this.classRoomService.addUser(id, payload.user_id)
    return response.ok(result)
  }

  async removeUser({ request, response }: HttpContext) {
    const { id } = request.params()
    if (!id) {
      throw new ApplicationException('Id is required', {
        status: 422,
        code: 'ID_REQUIRED',
        cause: 'Id is required',
      })
    }
    const payload = request.only(['user_id'])
    const result = await this.classRoomService.removeUser(id, payload.user_id)
    return response.ok(result)
  }
}
