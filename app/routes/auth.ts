const AuthController = () => import('#controllers/auth')
import router from '@adonisjs/core/services/router'

export const AuthRoute = router
  .group(function () {
    router.post('/sign-in', [AuthController, 'signIn'])
  })
  .prefix('/auth')
