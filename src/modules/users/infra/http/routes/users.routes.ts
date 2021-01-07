import { Router } from 'express'
import multer from 'multer'
import { container } from 'tsyringe'

import uploadConfig from '@config/upload'
import CreateUserService from '@modules/users/services/CreateUserService'

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

userRouter.patch('/avatar', upload.single('avatar'), (request, response) => {
  const userId = request.user.id

  return response.json(userId)
})

export default userRouter
