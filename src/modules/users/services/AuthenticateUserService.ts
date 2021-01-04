import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import User from '../infra/typeorm/entities/User'
import IAuthenticationProvider from '../providers/AuthenticationProvider/models/IAuthenticationProvider'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('AuthenticationProvider')
    private authenticationProvider: IAuthenticationProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError(
        'BAD_REQUEST',
        'Incorrect email/password combination',
        401
      )
    }

    const comparedHash = await this.hashProvider.compareHash(
      password,
      user.password
    )

    if (!comparedHash) {
      throw new AppError(
        'BAD_REQUEST',
        'Incorrect email/password combination',
        401
      )
    }

    const token = this.authenticationProvider.sign({ id: user.id })

    return {
      user,
      token
    }
  }
}

export default AuthenticateUserService
