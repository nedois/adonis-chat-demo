import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import * as validator from '#validators/authentication'

export default class AuthenticationController {
  /** Login method */
  async store({ request }: HttpContext) {
    const { email, password, remember } = await request.validateUsing(validator.store)

    const user = await User.verifyCredentials(email, password)

    return User.accessTokens.create(user, ['*'], {
      expiresIn: remember ? '30d' : '1d',
    })
  }

  /** Logout method */
  async delete({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
  }
}
