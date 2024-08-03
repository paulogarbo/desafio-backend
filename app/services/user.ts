import { UserCreate, UserUpdate } from '#dto/user'
import ApplicationException from '#exceptions/application'
import UserRepository from '#repositories/user'
import { inject } from '@adonisjs/core'

@inject()
export default class UserService {
  constructor(private userRepository: UserRepository) {}

  async show(payload: number) {
    const user = await this.userRepository.findById(payload)
    if (!user) {
      throw new ApplicationException('User not found', {
        status: 404,
        code: 'USER_NOT_FOUND',
        cause: 'User not found',
      })
    }

    return user
  }

  async paginate() {
    return await this.userRepository.paginate()
  }

  async create(payload: UserCreate) {
    const user = await this.userRepository.findByEmail(payload.email)
    if (user) {
      throw new ApplicationException('User already exists', {
        status: 409,
        code: 'USER_ALREADY_EXISTS',
        cause: 'User already exists',
      })
    }

    return await this.userRepository.create(payload)
  }

  async update(id: number, payload: UserUpdate) {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new ApplicationException('User not found', {
        status: 404,
        code: 'USER_NOT_FOUND',
        cause: 'User not found',
      })
    }

    return await this.userRepository.update(user, payload)
  }

  async delete(id: number) {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new ApplicationException('User not found', {
        status: 404,
        code: 'USER_NOT_FOUND',
        cause: 'User not found',
      })
    }

    return await this.userRepository.delete(user)
  }

  async classrooms(id: number) {
    return await this.userRepository.classrooms(id)
  }
}
