import jwt from 'jsonwebtoken'

import authConfig from '@config/auth'

import IAuthenticationProvider from '../models/IAuthenticationProvider'

class AuthenticationProvider implements IAuthenticationProvider {
  public sign(payload: string | object): string {
    return jwt.sign(payload, authConfig.secret, authConfig.config)
  }

  public async verify(payload: string): Promise<string | object | void> {
    return new Promise((resolve, reject) => {
      jwt.verify(payload, authConfig.secret, (error, decoded) =>
        error ? reject(error) : resolve(decoded)
      )
    })
  }
}

export default AuthenticationProvider
