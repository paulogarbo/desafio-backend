import {
  ClassroomCreateSchema,
  ClassroomToggleUserSchema,
  ClassroomUpdateSchema,
} from '#validators/classroom'
import { Infer } from '@vinejs/vine/types'

export type ClassroomUpdate = Infer<typeof ClassroomUpdateSchema>
export type ClassroomCreate = Infer<typeof ClassroomCreateSchema>
export type ClassroomToggleUser = Infer<typeof ClassroomToggleUserSchema>
