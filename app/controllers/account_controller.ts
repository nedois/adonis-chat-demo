import type { HttpContext } from '@adonisjs/core/http'

export default class AccountController {
  async index({ auth }: HttpContext) {
    return auth.getUserOrFail()
  }
}
