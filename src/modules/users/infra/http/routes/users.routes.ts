import { Router } from 'express'
import multer from 'multer'
import { container } from 'tsyringe'

import uploadConfig from '@config/upload'
import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const userRouter = Router()

const upload = multer(uploadConfig.multer)

userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body

  const createUser = container.resolve(CreateUserService)

  const user = await createUser.execute({
    name,
    email,
    password
  })

  return response.json({ ...user, password: undefined })
})

userRouter.use(ensureAuthenticated)

userRouter.patch(
  '/avatar',
  upload.single('avatar'),
  async (request, response) => {
    const userId = request.user.id
    const { filename } = request.file

    const updateUserAvatar = container.resolve(UpdateUserAvatarService)

    const user = await updateUserAvatar.execute({
      userId,
      avatarFilename: filename
    })

    return response.json({ ...user, password: undefined })
  }
)

export default userRouter
