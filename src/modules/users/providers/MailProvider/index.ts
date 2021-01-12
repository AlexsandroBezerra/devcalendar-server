import { container } from 'tsyringe'

import EtherealMailProvider from './implementations/EtherealMailProvider'
import IMailProvider from './models/IMailProvider'

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider)
)
