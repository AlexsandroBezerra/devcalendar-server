import ICreateEventDTO from '../dtos/ICreateEventDTO'
import Event from '../entities/Event'

export default interface IEventsRepository {
  create(eventData: ICreateEventDTO): Promise<Event>
}
