import User from '@modules/users/infra/typeorm/entities/User'

interface IAuthenticationProvider {
  sign(user: User): string
  verify(payload: string): Promise<string | object | void>
}

export default IAuthenticationProvider
