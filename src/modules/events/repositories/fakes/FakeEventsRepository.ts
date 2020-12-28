import { v4 as uuid } from 'uuid'

import ICreateEventDTO from '@modules/events/dtos/ICreateEventDTO'
import Event from '@modules/events/entities/Event'

import IEventsRepository from '../IEventsRepository'

export default class FakeEventsRepository implements IEventsRepository {
  private events: Event[] = []

  public async create(eventData: ICreateEventDTO): Promise<Event> {
    const event = new Event()

    Object.assign(event, eventData)

    event.id = uuid()

    this.events.push(event)

    return event
  }
}
