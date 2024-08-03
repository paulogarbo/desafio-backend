import BaseSerial from '#models/base'
import { column } from '@adonisjs/lucid/orm'

export default class Classroom extends BaseSerial {
  @column()
  declare identifier: number

  @column()
  declare capacity: number
}
