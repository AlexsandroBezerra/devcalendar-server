import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

import FakeEventsRepository from '../repositories/fakes/FakeEventsRepository'
import ListEventsService from './ListEventsService'

let fakeUsersRepository: FakeUsersRepository
let fakeEventsRepository: FakeEventsRepository
let listEvents: ListEventsService

describe('ListEvent', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeEventsRepository = new FakeEventsRepository()

    listEvents = new ListEventsService(fakeEventsRepository)
  })

  it("should list users' events in an specific date", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    fakeEventsRepository.create({
      date: new Date(2020, 11, 30),
      title: 'Test',
      userId: user.id
    })

    fakeEventsRepository.create({
      date: new Date(2020, 11, 31),
      title: 'Test',
      userId: user.id
    })

    const events = await listEvents.execute({
      userId: user.id,
      date: new Date(2020, 11, 30)
    })

    expect(events).toHaveLength(1)
  })

  it("should list users' events in an specific date", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    fakeEventsRepository.create({
      date: new Date(2020, 11, 30),
      title: 'Test',
      userId: user.id
    })

    fakeEventsRepository.create({
      date: new Date(2020, 11, 30),
      title: 'Test',
      userId: user.id
    })

    fakeEventsRepository.create({
      date: new Date(2020, 11, 31),
      title: 'Test',
      userId: user.id
    })

    const events = await listEvents.execute({
      userId: user.id,
      date: new Date(2020, 11, 30)
    })

    expect(events).toHaveLength(2)
  })

  it("should list users' events from an specific user", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const user2 = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456'
    })

    fakeEventsRepository.create({
      date: new Date(2020, 11, 30),
      title: 'Test',
      userId: user.id
    })

    fakeEventsRepository.create({
      date: new Date(2020, 11, 30),
      title: 'Test',
      userId: user.id
    })

    fakeEventsRepository.create({
      date: new Date(2020, 11, 30),
      title: 'Test',
      userId: user2.id
    })

    const events = await listEvents.execute({
      userId: user.id,
      date: new Date(2020, 11, 30)
    })

    expect(events).toHaveLength(2)
  })
})
