import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailProvider from '../models/IMailProvider'

class EtherealMailProvider implements IMailProvider {
  private client: Mail

  constructor() {
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

  async sendMail({ from, to, subject, body }: ISendMailDTO): Promise<void> {
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
      html: body
    })

    console.log(`[RecoveryPassword: ${to.email}]`)
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`)
  }
}

export default EtherealMailProvider
