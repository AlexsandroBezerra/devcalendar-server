import { container } from 'tsyringe'

import EventsRepository from '@modules/events/infra/typeorm/repositories/EventsRepository'
import IEventsRepository from '@modules/events/repositories/IEventsRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

container.registerSingleton<IEventsRepository>(
  'EventsRepository',
  EventsRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
