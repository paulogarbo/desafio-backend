const UserController = () => import('#controllers/user')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

export const UserRoute = router
  .group(function () {
    router.get(':id/classrooms', [UserController, 'classrooms'])

    router
      .group(function () {
        router.get('/paginate', [UserController, 'paginate'])
        router.get(':id/profile', [UserController, 'show'])

        router.post('/create', [UserController, 'create'])
        router.put(':id/update', [UserController, 'update'])
        router.delete(':id/delete', [UserController, 'delete'])
      })
      .middleware(middleware.isAdmin()) // middleware para validar o role do usuário
  })
  .prefix('/user')
  .middleware(middleware.auth()) // middleware para validar o token de acesso
