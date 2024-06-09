import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import * as validator from '#validators/register'

export default class RegisterController {
  async store({ request }: HttpContext) {
    const data = await request.validateUsing(validator.store)
    return new User().merge(data).save()
  }
}
