import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseMailTemplateDTO'

interface IMailContact {
  name: string
  email: string
}

interface ISendMailDTO {
  from?: IMailContact
  to: IMailContact

  subject: string
  template: IParseMailTemplateDTO
}

export default ISendMailDTO
