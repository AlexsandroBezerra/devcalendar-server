import { container } from 'tsyringe'

import '@modules/users/providers'

import EventsRepository from '@modules/events/infra/typeorm/repositories/EventsRepository'
import IEventsRepository from '@modules/events/repositories/IEventsRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

container.registerSingleton<IEventsRepository>(
  'EventsRepository',
  EventsRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)
