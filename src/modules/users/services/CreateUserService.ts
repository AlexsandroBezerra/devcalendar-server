import AppError from '@shared/errors/AppError'

import IUsersRepository from '../repositories/IUsersRepository'
import User from '../typeorm/entities/User'

interface IRequest {
  name: string
  email: string
  password: string
}

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('Email address already used')
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password
    })

    return user
  }
}

export default CreateUserService
