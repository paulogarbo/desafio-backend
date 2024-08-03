import { BaseSchema } from '@adonisjs/lucid/schema'
import { Role } from '../../app/dto/constant.js'

export default class extends BaseSchema {
  protected tableName = 'users'
  private role = Object.values(Role)

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('registration').notNullable()
      table.date('date_of_birth').notNullable()
      table.enum('role', this.role).notNullable().defaultTo(Role.USER)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
