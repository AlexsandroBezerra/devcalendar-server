import { classToClass } from 'class-transformer'
import { Router } from 'express'
import { container } from 'tsyringe'

import UpdateProfileService from '@modules/users/services/UpdateProfileService'

const profileRouter = Router()

profileRouter.put('/', async (request, response) => {
  const userId = request.user.id
  const { name, email, oldPassword, password } = request.body

  const updateProfile = container.resolve(UpdateProfileService)

  const user = await updateProfile.execute({
    userId,
    name,
    email,
    oldPassword,
    password
  })

  return response.json(classToClass(user))
})

export default profileRouter
