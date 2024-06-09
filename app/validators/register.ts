import vine from '@vinejs/vine'

export const store = vine.compile(
  vine.object({
    displayName: vine.string().optional(),
    username: vine.string().alphaNumeric(),
    email: vine.string().email(),
    password: vine.string(),
  })
)
