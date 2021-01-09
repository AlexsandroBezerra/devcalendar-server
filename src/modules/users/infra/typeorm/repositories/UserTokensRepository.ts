import { getRepository, Repository } from 'typeorm'

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'

import UserToken from '../entities/UserToken'

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>

  constructor() {
    this.ormRepository = getRepository(UserToken)
  }

  async generate(userId: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      userId
    })

    await this.ormRepository.save(userToken)

    return userToken
  }

  async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token }
    })

    return userToken
  }
}

export default UserTokensRepository
