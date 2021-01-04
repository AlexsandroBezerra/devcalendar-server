import { inject, injectable } from 'tsyringe'

import { convertTimeToMinutes } from '@shared/utils/convertTimeToMinutes'

import Event from '../infra/typeorm/entities/Event'
import IEventsRepository from '../repositories/IEventsRepository'

interface IRequest {
  userId: string
  title: string
  description?: string
  date: Date
  from?: string
  to?: string
}

@injectable()
class CreateEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository
  ) {}

  public async execute({
    userId,
    title,
    description,
    date,
    from,
    to
  }: IRequest): Promise<Event> {
    if (from && to) {
      const fromInMinutes = convertTimeToMinutes(from)
      const toInMinutes = convertTimeToMinutes(to)

      const event = await this.eventsRepository.create({
        userId,
        title,
        description,
        date,
        from: fromInMinutes,
        to: toInMinutes
      })

      return event
    }

    const event = await this.eventsRepository.create({
      userId,
      title,
      description,
      date
    })

    return event
  }
}

export default CreateEventService
