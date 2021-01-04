import { SignOptions } from 'jsonwebtoken'

interface IAuthConfig {
  secret: string
  config: SignOptions
}

const authConfig: IAuthConfig = {
  secret: process.env.JWT_SECRET || 'secret-jwt-key',

  config: {
    expiresIn: '1d'
  }
}

export default authConfig
