import { Router } from 'express'

import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider'
import CreateUserService from '@modules/users/services/CreateUserService'

import UsersRepository from '../../typeorm/repositories/UsersRepository'

const userRouter = Router()

userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body

  const usersRepository = new UsersRepository()
  const hashProvider = new BCryptHashProvider()

  const createUser = new CreateUserService(usersRepository, hashProvider)

  const user = await createUser.execute({
    name,
    email,
    password
  })

  return response.json({ ...user, password: undefined })
})

export default userRouter
