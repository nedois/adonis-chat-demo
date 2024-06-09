import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AccountController = () => import('#controllers/account_controller')
const AuthenticationController = () => import('#controllers/authentication_controller')
const RegisterController = () => import('#controllers/register_controller')

/* ---------------------------- Public routes ---------------------------- */
router.post('login', [AuthenticationController, 'store'])
router.post('register', [RegisterController, 'store'])

/* ---------------------------- Protected routes ---------------------------- */
router
  .group(() => {
    router.resource('account', AccountController).apiOnly().only(['index'])
    router.delete('logout', [AuthenticationController, 'delete'])
  })
  .use(middleware.auth({ guards: ['api'] }))
