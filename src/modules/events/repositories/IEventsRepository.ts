import ICreateEventDTO from '../dtos/ICreateEventDTO'
import Event from '../infra/typeorm/entities/Event'

interface IEventsRepository {
  create(eventData: ICreateEventDTO): Promise<Event>
}

export default IEventsRepository
