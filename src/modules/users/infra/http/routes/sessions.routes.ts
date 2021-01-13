import { classToClass } from 'class-transformer'
import { Router } from 'express'
import { container } from 'tsyringe'
import * as Yup from 'yup'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
  })

  const data = {
    email,
    password
  }

  await schema.validate(data, {
    abortEarly: false
  })

  const authenticateUser = container.resolve(AuthenticateUserService)

  const responseData = await authenticateUser.execute(data)

  return response.json(classToClass(responseData))
})

export default sessionsRouter
