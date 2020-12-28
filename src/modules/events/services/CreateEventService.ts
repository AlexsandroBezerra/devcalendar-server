import Event from '../entities/Event'
import IEventsRepository from '../repositories/IEventsRepository'

interface IRequest {
  title: string
  description?: string
  date: Date
}

export default class CreateEventService {
  constructor(private eventsRepository: IEventsRepository) {}

  public async execute({ title, description, date }: IRequest): Promise<Event> {
    const event = await this.eventsRepository.create({
      title,
      description,
      date
    })

    return event
  }
}
