import { isAfter, addHours } from 'date-fns'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokensRepository from '../repositories/IUserTokensRepository'

interface IRequest {
  password: string
  token: string
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('UNAUTHORIZED', 'User token does not exists', 401)
    }

    const user = await this.usersRepository.findById(userToken.userId)

    if (!user) {
      throw new AppError('CONFLICT', 'User does not exists', 409)
    }

    const tokenCreatedAt = userToken.createdAt
    const compareDate = addHours(tokenCreatedAt, 2)

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('UNAUTHORIZED', 'Token expired', 401)
    }

    user.password = await this.hashProvider.generateHash(password)

    await this.usersRepository.update(user)
  }
}

export default ResetPasswordService
