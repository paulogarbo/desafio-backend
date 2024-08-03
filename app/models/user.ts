import { Role } from '#dto/constant'
import BaseSerial from '#models/base'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Classroom from './classroom.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseSerial, AuthFinder) {
  @column()
  declare name: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: Role

  @column()
  declare registration: string

  @column.dateTime({ autoCreate: false, serializeAs: 'date_of_birth', columnName: 'date_of_birth' })
  declare dateOfBirth: DateTime

  @manyToMany(() => Classroom, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'classroom_id',
    pivotTable: 'classroom_users',
    pivotTimestamps: true,
  })
  declare rooms: ManyToMany<typeof Classroom>

  static tokens = DbAccessTokensProvider.forModel(User)
}
