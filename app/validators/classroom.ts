import vine from '@vinejs/vine'

export const ClassroomUpdateSchema = vine.object({
  identifier: vine.number().optional(),
  capacity: vine.number().optional(),
})

export const ClassroomCreateSchema = vine.object({
  identifier: vine.number(),
  capacity: vine.number(),
})

export const ClassroomToggleUserSchema = vine.object({
  user_id: vine.number(),
  classroom_id: vine.number(),
})

export const ClassroomUpdateValidator = vine.compile(ClassroomUpdateSchema)
export const ClassroomCreateValidator = vine.compile(ClassroomCreateSchema)
export const ClassroomToggleUserValidator = vine.compile(ClassroomToggleUserSchema)
