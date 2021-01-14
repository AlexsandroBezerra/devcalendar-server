import { isSameDay } from 'date-fns'
import { v4 as uuid } from 'uuid'

import ICreateEventDTO from '@modules/events/dtos/ICreateEventDTO'
import IFindEventsDTO from '@modules/events/dtos/IFindEventsDTO'
import Event from '@modules/events/infra/typeorm/entities/Event'

import IEventsRepository from '../IEventsRepository'

class FakeEventsRepository implements IEventsRepository {
  private events: Event[] = []

  public async create(eventData: ICreateEventDTO): Promise<Event> {
    const event = new Event()

    Object.assign(event, eventData)

    event.id = uuid()

    this.events.push(event)

    return event
  }

  public async find({ userId, date }: IFindEventsDTO): Promise<Event[]> {
    const events = this.events.filter(event => {
      return event.userId === userId && isSameDay(date, event.date)
    })

    return events
  }
}

export default FakeEventsRepository
