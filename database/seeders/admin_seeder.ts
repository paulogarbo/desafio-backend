import { Role } from '#dto/constant'
import BaseSerial from '#models/base'
import User from '#models/user'

// EXIGÊNCIA 22

export default class AdminSeeder extends BaseSerial {
  async run() {
    const searchPayload = { email: 'admin@email.com' }
    const payload = {
      name: 'admin',
      email: 'admin@email.com',
      password: 'admin',
      role: Role.ADMIN,
      registration: '123456789',
      date_of_birth: '1990-01-01',
    }

    await User.updateOrCreate(searchPayload, payload) // vai atualizar ou vai criar
  }
}
