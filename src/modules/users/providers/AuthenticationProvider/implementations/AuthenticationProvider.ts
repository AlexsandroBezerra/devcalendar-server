import jwt from 'jsonwebtoken'

import authConfig from '@config/auth'
import User from '@modules/users/infra/typeorm/entities/User'

import IAuthenticationProvider from '../models/IAuthenticationProvider'

class AuthenticationProvider implements IAuthenticationProvider {
  public sign(user: User): string {
    const payload = {
      id: user.id
    }

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
