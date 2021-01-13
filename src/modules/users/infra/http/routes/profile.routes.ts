import { classToClass } from 'class-transformer'
import { Router } from 'express'
import { container } from 'tsyringe'
import * as Yup from 'yup'

import UpdateProfileService from '@modules/users/services/UpdateProfileService'

const profileRouter = Router()

profileRouter.put('/', async (request, response) => {
  const userId = request.user.id
  const {
    name,
    email,
    oldPassword,
    password,
    passwordConfirmation
  } = request.body

  const updateProfile = container.resolve(UpdateProfileService)

  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('Email is required'),
    oldPassword: Yup.string(),
    password: Yup.string().min(6, 'It must be at least 6 characters'),
    passwordConfirmation: Yup.string()
      .when('password', {
        is: (val?: string) => Boolean(val?.length),
        then: Yup.string()
          .min(6, 'It must be at least 6 characters')
          .required('When updating password, you should confirm your password'),
        otherwise: Yup.string()
      })
      .oneOf([Yup.ref('password')], 'Confirmação incorreta')
  })

  const data = {
    userId,
    name,
    email,
    oldPassword,
    password,
    passwordConfirmation
  }

  await schema.validate(data, {
    abortEarly: false
  })

  const user = await updateProfile.execute(data)

  return response.json(classToClass(user))
})

export default profileRouter
