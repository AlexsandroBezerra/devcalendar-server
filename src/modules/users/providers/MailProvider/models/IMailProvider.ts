import ISendMailDTO from '../dtos/ISendMailDTO'

interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>
}

export default IMailProvider
