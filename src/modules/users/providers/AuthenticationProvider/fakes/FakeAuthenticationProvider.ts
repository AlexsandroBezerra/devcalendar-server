import IAuthenticationProvider from '../models/IAuthenticationProvider'

interface IToken {
  authenticated: boolean
  payload: string | object
}

class FakeAuthenticationRepository implements IAuthenticationProvider {
  public sign(payload: string | object): string {
    const token = JSON.stringify({
      authenticated: true,
      payload
    })

    return token
  }

  public async verify(token: string): Promise<string | object | undefined> {
    const { authenticated, payload }: IToken = JSON.parse(token)

    if (!authenticated) {
      throw new Error('Invalid token')
    }

    return payload
  }
}

export default FakeAuthenticationRepository
