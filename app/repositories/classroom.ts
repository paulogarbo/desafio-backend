import { ClassroomCreate, ClassroomToggleUser, ClassroomUpdate } from '#dto/classroom'
import Model from '#models/classroom'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class ClassRoomRepository {
  constructor() {}

  async create(payload: ClassroomCreate) {
    return await Model.create(payload)
  }

  async update(classroom: Model, payload: ClassroomUpdate) {
    classroom.merge(payload)
    await classroom.save()
    return classroom
  }

  async delete(classroom: Model) {
    return await classroom.delete()
  }

  async findByIdentifier(identifier: number) {
    // return await Model.findBy('identifier', number)
    return await Model.query().where('identifier', identifier).first()
  }

  async findById(id: number) {
    // return await Model.findBy('id', id)
    return await Model.query().where('id', id).first()
  }

  async addUser(payload: ClassroomToggleUser) {
    await db.table('classroom_users').insert({
      classroom_id: payload.classroom_id,
      user_id: payload.user_id,
      created_at: DateTime.now(),
      updated_at: DateTime.now(),
    })
  }

  async removeUser(payload: ClassroomToggleUser) {
    await db
      .from('classroom_users')
      .where('classroom_id', payload.classroom_id)
      .andWhere('user_id', payload.user_id)
      .delete()
  }

  async countClassroomById(id: number) {
    const [classroom] = await db
      .from('classroom_users')
      .count('*', 'count')
      .where('classroom_id', id)

    return (classroom as { count: number }).count
  }

  async checkUser(user_id: number, classroom_id: number) {
    const userClassroom = await db
      .from('classroom_users')
      .where('user_id', user_id)
      .andWhere('classroom_id', classroom_id)
      .first()

    return !!userClassroom
  }
}
