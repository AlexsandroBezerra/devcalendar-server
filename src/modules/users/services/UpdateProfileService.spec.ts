import AppError from '@shared/errors/AppError'

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateProfileService from './UpdateProfileService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let updateProfile: UpdateProfileService

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    )
  })

  it('should be update the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      name: 'John Trê',
      email: 'johntre@example.com'
    })

    expect(updatedUser.name).toBe('John Trê')
    expect(updatedUser.email).toBe('johntre@example.com')
  })

  it('should be update a non-existing user profile', async () => {
    await expect(
      updateProfile.execute({
        userId: 'non-existing-user',
        name: 'John Trê',
        email: 'johntre@example.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to change to a already used email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123456'
    })

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'Test',
        email: 'johndoe@example.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123123',
      oldPassword: '123456'
    })

    expect(updatedUser.password).toBe('123123')
  })

  it('should not update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'John Trê',
        email: 'johntre@example.com',
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'John Trê',
        email: 'johntre@example.com',
        password: '123123',
        oldPassword: 'wrong-old-password'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
