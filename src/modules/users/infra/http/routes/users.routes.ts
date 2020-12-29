import { Router } from 'express'
import { container } from 'tsyringe'

import CreateUserService from '@modules/users/services/CreateUserService'

const userRouter = Router()

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

export default userRouter
