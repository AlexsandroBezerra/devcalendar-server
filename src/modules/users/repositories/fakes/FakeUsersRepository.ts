import { v4 as uuid } from 'uuid'

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import User from '@modules/users/infra/typeorm/entities/User'

import IUsersRepository from '../IUsersRepository'

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = []

  async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User()

    user.id = uuid()

    Object.assign(user, userData)

    this.users.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(findUser => findUser.email === email)
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(findUser => findUser.id === id)
  }

  async update(updatedUser: User): Promise<User> {
    const index = this.users.findIndex(user => user.id === updatedUser.id)

    if (index < 0) {
      throw new Error('User not found')
    }

    this.users[index] = updatedUser

    return updatedUser
  }
}

export default FakeUsersRepository
