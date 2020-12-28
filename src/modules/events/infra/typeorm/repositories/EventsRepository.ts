import { getRepository, Repository } from 'typeorm'

import ICreateEventDTO from '@modules/events/dtos/ICreateEventDTO'
import IEventsRepository from '@modules/events/repositories/IEventsRepository'

import Event from '../entities/Event'

class EventsRepository implements IEventsRepository {
  private ormRepository: Repository<Event>

  constructor() {
    this.ormRepository = getRepository(Event)
  }

  public async create(eventData: ICreateEventDTO): Promise<Event> {
    const event = this.ormRepository.create(eventData)

    await this.ormRepository.save(event)

    return event
  }
}

export default EventsRepository
