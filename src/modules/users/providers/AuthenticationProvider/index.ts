import { container } from 'tsyringe'

import AuthenticationProvider from './implementations/AuthenticationProvider'
import IAuthenticationProvider from './models/IAuthenticationProvider'

container.registerSingleton<IAuthenticationProvider>(
  'AuthenticationProvider',
  AuthenticationProvider
)
