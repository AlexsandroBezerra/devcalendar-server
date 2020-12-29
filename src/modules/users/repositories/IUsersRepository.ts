import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

import User from '../infra/typeorm/entities/User'

interface IUsersRepository {
  create(userData: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | undefined>
}

export default IUsersRepository
