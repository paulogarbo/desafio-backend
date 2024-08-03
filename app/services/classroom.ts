import ApplicationException from '#exceptions/application'
import ClassRoomRepository from '#repositories/classroom'
import UserRepository from '#repositories/user'
import { inject } from '@adonisjs/core'
import { ClassroomCreate, ClassroomUpdate } from '#dto/classroom'

@inject()
export default class ClassRoomService {
  constructor(
    private classRoomRepository: ClassRoomRepository,
    private userRepository: UserRepository
  ) {}

  async addUser(id: number, user_id: number) {
    const classroom = await this.classRoomRepository.findById(id)

    if (!classroom)
      throw new ApplicationException('Classroom not found', {
        status: 404,
        code: 'CLASSROOM_NOT_FOUND',
        cause: 'Classroom not found',
      })

    const user = await this.userRepository.findById(user_id)

    if (!user)
      throw new ApplicationException('User not found', {
        status: 404,
        code: 'USER_NOT_FOUND',
        cause: 'User not found',
      })

    const count = await this.classRoomRepository.countClassroomById(classroom.id)

    if (!(count < classroom.capacity))
      throw new ApplicationException('Classroom is full', {
        status: 409,
        code: 'CLASSROOM_IS_FULL',
        cause: 'Classroom is full',
      })

    const existUserInClassroom = await this.classRoomRepository.checkUser(user_id, id)

    if (existUserInClassroom)
      throw new ApplicationException('User already in classroom', {
        status: 409,
        code: 'USER_ALREADY_IN_CLASSROOM',
        cause: 'User already in classroom',
      })

    return await this.classRoomRepository.addUser({ user_id, classroom_id: id })
  }

  async removeUser(id: number, user_id: number) {
    const classroom = await this.classRoomRepository.findById(id)

    if (!classroom)
      throw new ApplicationException('Classroom not found', {
        status: 404,
        code: 'CLASSROOM_NOT_FOUND',
        cause: 'Classroom not found',
      })

    const user = await this.userRepository.findById(user_id)

    if (!user)
      throw new ApplicationException('User not found', {
        status: 404,
        code: 'USER_NOT_FOUND',
        cause: 'User not found',
      })

    const existUserInClassroom = await this.classRoomRepository.checkUser(user_id, id)

    if (!existUserInClassroom)
      throw new ApplicationException('User not in classroom', {
        status: 404,
        code: 'USER_NOT_IN_CLASSROOM',
        cause: 'User not in classroom',
      })

    return await this.classRoomRepository.removeUser({ user_id, classroom_id: id })
  }

  async show(id: number) {
    const classroom = await this.classRoomRepository.findById(id)
    if (!classroom) {
      throw new ApplicationException('Classroom not found', {
        status: 404,
        code: 'CLASSROOM_NOT_FOUND',
        cause: 'Classroom not found',
      })
    }

    return classroom
  }

  async create(payload: ClassroomCreate) {
    const classroom = await this.classRoomRepository.findByIdentifier(payload.identifier)
    if (classroom) {
      throw new ApplicationException('Classroom already exists', {
        status: 409,
        code: 'CLASSROOM_ALREADY_EXISTS',
        cause: 'Classroom already exists',
      })
    }

    return await this.classRoomRepository.create(payload)
  }

  async update(id: number, payload: ClassroomUpdate) {
    const classroom = await this.classRoomRepository.findById(id)
    if (!classroom) {
      throw new ApplicationException('Classroom not found', {
        status: 404,
        code: 'CLASSROOM_NOT_FOUND',
        cause: 'Classroom not found',
      })
    }

    return await this.classRoomRepository.update(classroom, payload)
  }

  async delete(id: number) {
    const classroom = await this.classRoomRepository.findById(id)
    if (!classroom) {
      throw new ApplicationException('Classroom not found', {
        status: 404,
        code: 'CLASSROOM_NOT_FOUND',
        cause: 'Classroom not found',
      })
    }

    return await this.classRoomRepository.delete(classroom)
  }
}
