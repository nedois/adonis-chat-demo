import vine from '@vinejs/vine'

export const store = vine.compile(
  vine.object({
    name: vine.string().minLength(1),
  })
)
