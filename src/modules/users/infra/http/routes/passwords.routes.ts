import { Router } from 'express'
import { container } from 'tsyringe'

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

export default passwordRouter
