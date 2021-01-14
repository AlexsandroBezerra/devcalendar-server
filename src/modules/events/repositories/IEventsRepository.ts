import ICreateEventDTO from '../dtos/ICreateEventDTO'
import IFindEventsDTO from '../dtos/IFindEventsDTO'
import Event from '../infra/typeorm/entities/Event'

interface IEventsRepository {
  create(eventData: ICreateEventDTO): Promise<Event>
  find(findProps: IFindEventsDTO): Promise<Event[]>
}

export default IEventsRepository
