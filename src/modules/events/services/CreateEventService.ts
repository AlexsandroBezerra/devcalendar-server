import { convertTimeToMinutes } from '@shared/utils/convertTimeToMinutes'

import Event from '../entities/Event'
import IEventsRepository from '../repositories/IEventsRepository'

interface IRequest {
  title: string
  description?: string
  date: Date
  from?: string
  to?: string
}

export default class CreateEventService {
  constructor(private eventsRepository: IEventsRepository) {}

  public async execute({
    title,
    description,
    date,
    from,
    to
  }: IRequest): Promise<Event> {
    let event: Event

    if (from && to) {
      const fromInMinutes = convertTimeToMinutes(from)
      const toInMinutes = convertTimeToMinutes(to)

      event = await this.eventsRepository.create({
        title,
        description,
        date,
        from: fromInMinutes,
        to: toInMinutes
      })
    } else {
      event = await this.eventsRepository.create({
        title,
        description,
        date
      })
    }

    return event
  }
}
