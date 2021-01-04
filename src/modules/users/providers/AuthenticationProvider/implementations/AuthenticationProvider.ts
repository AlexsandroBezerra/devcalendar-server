import jwt from 'jsonwebtoken'

import IAuthenticationProvider from '../models/IAuthenticationProvider'

class AuthenticationProvider implements IAuthenticationProvider {
  public sign(payload: string | object): string {
    return jwt.sign(payload, 'secret_key')
  }

  public async verify(payload: string): Promise<string | object | void> {
    return new Promise((resolve, reject) => {
      jwt.verify(payload, 'secret_key', (error, decoded) =>
        error ? reject(error) : resolve(decoded)
      )
    })
  }
}

export default AuthenticationProvider
