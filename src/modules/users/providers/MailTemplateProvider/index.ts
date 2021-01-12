import { container } from 'tsyringe'

import HandlebarsTemplateMailProvider from './implementations/HandlebarsTemplateMailProvider'
import IMailTemplateProvider from './models/IMailTemplateProvider'

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsTemplateMailProvider
)
