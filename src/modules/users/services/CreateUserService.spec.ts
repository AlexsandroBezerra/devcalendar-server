import { validate as isUuid } from 'uuid'

import AppError from '@shared/errors/AppError'

import User from '../infra/typeorm/entities/User'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserService from './CreateUserService'

let fakeUsersRepository: FakeUsersRepository
let createUser: CreateUserService

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    createUser = new CreateUserService(fakeUsersRepository)
  })

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(user).toBeInstanceOf(User)
    expect(isUuid(user.id)).toBe(true)
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to create a new user with email already registered', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
