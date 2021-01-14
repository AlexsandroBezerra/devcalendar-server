import Event from '../infra/typeorm/entities/Event'
import IEventsRepository from '../repositories/IEventsRepository'

interface IRequest {
  userId: string
  date: Date
}

class ListEventsService {
  constructor(private eventsRepository: IEventsRepository) {}

  public async execute({ userId, date }: IRequest): Promise<Event[]> {
    const events = await this.eventsRepository.find({
      userId,
      date
    })

    return events
  }
}

export default ListEventsService
