import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

import FakeEventsRepository from '../repositories/fakes/FakeEventsRepository'
import CreateEventService from './CreateEventService'

let fakeUsersRepository: FakeUsersRepository
let fakeEventsRepository: FakeEventsRepository
let createEvent: CreateEventService

describe('CreateEvent', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeEventsRepository = new FakeEventsRepository()
    createEvent = new CreateEventService(fakeEventsRepository)
  })

  it('should create an event', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const event = await createEvent.execute({
      userId: user.id,
      title: "New Year's eve",
      date: new Date(2020, 11, 31)
    })

    expect(event).toHaveProperty('id')
    expect(event.title).toEqual("New Year's eve")
  })

  it('should create an event having a start time and an end time', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const event = await createEvent.execute({
      userId: user.id,
      title: "New Year's eve",
      date: new Date(2020, 11, 31),
      from: '08:00',
      to: '09:32'
    })

    expect(event.from).toEqual(480)
    expect(event.to).toEqual(572)
  })
})
