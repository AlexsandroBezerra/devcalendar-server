import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import User from '../infra/typeorm/entities/User'
import IStorageProvider from '../providers/StorageProvider/models/IStorageProvider'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
  userId: string
  avatarFilename: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new AppError(
        'UNAUTHORIZED',
        'Only authenticated users can change avatar',
        401
      )
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }

    const fileName = await this.storageProvider.saveFile(avatarFilename)

    user.avatar = fileName

    await this.usersRepository.update(user)

    return user
  }
}

export default UpdateUserAvatarService
