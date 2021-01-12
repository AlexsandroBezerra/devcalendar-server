import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { inject, injectable } from 'tsyringe'

import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider'
import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailProvider from '../models/IMailProvider'

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Mail

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    nodemailer.createTestAccount((_, account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })

      this.client = transporter
    })
  }

  async sendMail({ from, to, subject, template }: ISendMailDTO): Promise<void> {
    const parsedTemplate = await this.mailTemplateProvider.parse(template)

    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'DevCalendar Team',
        address: from?.email || 'team@devcalendar.com.br'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: parsedTemplate
    })

    console.log(`[RecoveryPassword: ${to.email}]`)
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`)
  }
}

export default EtherealMailProvider
