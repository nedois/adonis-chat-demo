import vine from '@vinejs/vine'

export const store = vine.compile(
  vine.object({
    fullName: vine.string().optional(),
    email: vine.string().email(),
    password: vine.string(),
  })
)
