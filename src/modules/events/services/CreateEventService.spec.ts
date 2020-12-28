import { validate as isUuid } from 'uuid'

import FakeEventsRepository from '../repositories/fakes/FakeEventsRepository'
import CreateEventService from './CreateEventService'

let fakeEventsRepository: FakeEventsRepository
let createEvent: CreateEventService

describe('CreateEvent', () => {
  beforeEach(() => {
    fakeEventsRepository = new FakeEventsRepository()
    createEvent = new CreateEventService(fakeEventsRepository)
  })

  it('should create an event', async () => {
    const event = await createEvent.execute({
      title: "New Year's eve",
      date: new Date(2020, 11, 31)
    })

    expect(isUuid(event.id)).toBe(true)
    expect(event.title).toEqual("New Year's eve")
  })

  it('should create an event having a start time and an end time', async () => {
    const event = await createEvent.execute({
      title: "New Year's eve",
      date: new Date(2020, 11, 31),
      from: '08:00',
      to: '09:32'
    })

    expect(event.from).toEqual(480)
    expect(event.to).toEqual(572)
  })
})
