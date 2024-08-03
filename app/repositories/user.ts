// Todo o crud do usuário
import { Role } from '#dto/constant'
import { UserCreate, UserUpdate } from '#dto/user'
import Model from '#models/user'

export default class UserRepository {
  constructor() {}

  async create(payload: UserCreate) {
    return await Model.create(payload)
  }

  async update(user: Model, payload: UserUpdate) {
    user.merge(payload)
    await user.save()
    return user
  }

  async delete(user: Model) {
    return await user.delete()
  }

  async findById(id: number) {
    return await Model.query().where('id', id).first()
  }
  async findByEmail(email: string) {
    // return await Model.findBy('email', email)
    return await Model.query().where('email', email).first()
  }

  async paginate() {
    return await Model.query().whereNot('role', Role.ADMIN)
  }

  async classrooms(user_id: number) {
    const userWithClassrooms = await Model.query()
      .select(['id', 'name'])
      .preload('rooms')
      .where('id', user_id)
      .first()

    return {
      ...userWithClassrooms?.toJSON(),
      rooms: userWithClassrooms?.rooms?.map(({ id, identifier }) => ({ id, identifier })),
    }
  }
}
