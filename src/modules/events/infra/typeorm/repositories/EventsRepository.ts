import { getRepository, Raw, Repository } from 'typeorm'

import ICreateEventDTO from '@modules/events/dtos/ICreateEventDTO'
import IFindEventsDTO from '@modules/events/dtos/IFindEventsDTO'
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

  public async find({ date, userId }: IFindEventsDTO): Promise<Event[]> {
    const day = date.getDay()
    const month = date.getMonth()
    const year = date.getFullYear()

    const events = await this.ormRepository.find({
      where: {
        userId,
        date: Raw(
          dateField =>
            `to_char(${dateField}, 'DD-MM-YYY') = '${day}-${month}-${year}'`
        )
      }
    })

    return events
  }
}

export default EventsRepository
