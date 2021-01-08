import AppError from '@shared/errors/AppError'

import FakeStorageProvider from '../providers/StorageProvider/fakes/FakeStorageProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateUserAvatarService from './UpdateUserAvatarService'

let fakeUsersRepository: FakeUsersRepository
let fakeStorageProvider: FakeStorageProvider
let updateUserAvatar: UpdateUserAvatarService

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeStorageProvider = new FakeStorageProvider()

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    )
  })

  it('should be update a user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const saveFile = jest.spyOn(fakeStorageProvider, 'saveFile')

    const updatedUser = await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: 'avatar.jpg'
    })

    expect(updatedUser.avatar).toBe('avatar.jpg')
    expect(saveFile).toBeCalledWith('avatar.jpg')
  })

  it('should not be update avatar from non-existent user', async () => {
    await expect(
      updateUserAvatar.execute({
        userId: 'non-existent',
        avatarFilename: 'avatar.jpg'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should delete old avatar when updating new one', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: 'avatar.jpg'
    })

    const updatedUser = await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: 'avatar2.jpg'
    })

    expect(deleteFile).toBeCalledWith('avatar.jpg')
    expect(updatedUser.avatar).toBe('avatar2.jpg')
  })
})
