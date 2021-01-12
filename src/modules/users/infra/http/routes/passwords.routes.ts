import { Router } from 'express'
import { container } from 'tsyringe'

import ResetPasswordService from '@modules/users/services/ResetPasswordService'
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService'

const passwordRouter = Router()

passwordRouter.post('/forgot', async (request, response) => {
  const { email } = request.body

  const sendForgotPasswordEmail = container.resolve(
    SendForgotPasswordEmailService
  )

  await sendForgotPasswordEmail.execute({
    email
  })

  return response.status(204).send()
})

passwordRouter.post('/reset', async (request, response) => {
  const { password, token } = request.body

  const resetPassword = container.resolve(ResetPasswordService)

  await resetPassword.execute({
    password,
    token
  })

  return response.status(204).send()
})

export default passwordRouter
