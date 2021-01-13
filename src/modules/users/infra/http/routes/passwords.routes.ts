import { Router } from 'express'
import { container } from 'tsyringe'
import * as Yup from 'yup'

import ResetPasswordService from '@modules/users/services/ResetPasswordService'
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService'

const passwordRouter = Router()

passwordRouter.post('/forgot', async (request, response) => {
  const { email } = request.body

  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required')
  })

  const data = { email }

  await schema.validate(data, {
    abortEarly: false
  })

  const sendForgotPasswordEmail = container.resolve(
    SendForgotPasswordEmailService
  )

  await sendForgotPasswordEmail.execute(data)

  return response.status(204).send()
})

passwordRouter.post('/reset', async (request, response) => {
  const { password, passwordConfirmation, token } = request.body

  const schema = Yup.object().shape({
    token: Yup.string().uuid('Invalid token').required('Token is required'),
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password')], 'Bad confirmation')
      .required('passwordConfirmation is required')
  })

  const data = { password, passwordConfirmation, token }

  await schema.validate(data, {
    abortEarly: false
  })

  const resetPassword = container.resolve(ResetPasswordService)

  await resetPassword.execute(data)

  return response.status(204).send()
})

export default passwordRouter
