import { container } from 'tsyringe'

import '@modules/users/providers'

import EventsRepository from '@modules/events/infra/typeorm/repositories/EventsRepository'
import IEventsRepository from '@modules/events/repositories/IEventsRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'

container.registerSingleton<IEventsRepository>(
  'EventsRepository',
  EventsRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
)
