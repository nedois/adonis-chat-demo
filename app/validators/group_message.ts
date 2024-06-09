import vine from '@vinejs/vine'

export const store = vine.compile(
  vine.object({
    content: vine.string().minLength(1),
  })
)
