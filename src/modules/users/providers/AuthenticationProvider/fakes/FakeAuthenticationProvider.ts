import User from '@modules/users/infra/typeorm/entities/User'

import IAuthenticationProvider from '../models/IAuthenticationProvider'

interface IToken {
  authenticated: boolean
  payload: string | object
}

class FakeAuthenticationRepository implements IAuthenticationProvider {
  public sign(user: User): string {
    const payload = {
      id: user.id
    }

    const token = JSON.stringify({
      authenticated: true,
      payload
    })

    return token
  }

  public async verify(token: string): Promise<string | object | void> {
    const { authenticated, payload }: IToken = JSON.parse(token)

    if (!authenticated) {
      throw new Error('Invalid token')
    }

    return payload
  }
}

export default FakeAuthenticationRepository
