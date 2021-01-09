interface IMailContact {
  name: string
  email: string
}

interface ISendMailDTO {
  from?: IMailContact
  to: IMailContact

  subject: string
  body: string
}

export default ISendMailDTO
