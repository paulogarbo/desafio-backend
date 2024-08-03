const ClassRoomController = () => import('#controllers/classroom')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

export const ClassRoomRoute = router
  .group(function () {
    router.get(':id/view', [ClassRoomController, 'show'])
    router.post('/create', [ClassRoomController, 'create'])
    router.put(':id/update', [ClassRoomController, 'update'])
    router.delete(':id/delete', [ClassRoomController, 'delete'])
    router.post(':id/add-user', [ClassRoomController, 'addUser'])
    router.delete(':id/remove-user', [ClassRoomController, 'removeUser'])
  })
  .prefix('/classroom')
  .middleware(middleware.auth()) // middleware para validar o token de acesso
  .middleware(middleware.isAdmin()) // middleware para validar o role do usuário
