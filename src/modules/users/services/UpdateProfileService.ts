import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import User from '../infra/typeorm/entities/User'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
  userId: string
  name: string
  email: string
  oldPassword?: string
  password?: string
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    userId,
    name,
    email,
    password,
    oldPassword
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new AppError('BAD_REQUEST', 'User not found')
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email)

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== userId) {
      throw new AppError('CONFLICT', 'Email already used', 409)
    }

    user.name = name
    user.email = email

    if (password && !oldPassword) {
      throw new AppError(
        'UNAUTHORIZED',
        'You need to inform the old password to set a new password'
      )
    }

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password
      )

      if (!checkOldPassword) {
        throw new AppError('', 'Old password does not match')
      }

      user.password = await this.hashProvider.generateHash(password)
    }

    const updatedUser = await this.usersRepository.update(user)

    return updatedUser
  }
}

export default UpdateProfileService
