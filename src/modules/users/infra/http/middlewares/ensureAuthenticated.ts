import { NextFunction, Request, Response } from 'express'

import AppError from '@shared/errors/AppError'

import AuthenticationProvider from '@modules/users/providers/AuthenticationProvider/implementations/AuthenticationProvider'

interface ITokenPayload {
  iat: number
  exp: number
  id: string
}

export default async function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('UNAUTHORIZED', 'JWT is missing', 401)
  }

  const [scheme, token] = authHeader.split(' ')

  if (!/Bearer$/i.test(scheme)) {
    throw new AppError('UNAUTHORIZED', 'Mal-formatted token', 401)
  }

  const authenticationProvider = new AuthenticationProvider()

  try {
    const decoded = await authenticationProvider.verify(token)

    const { id } = decoded as ITokenPayload

    request.user = {
      id: id
    }

    return next()
  } catch {
    throw new AppError('UNAUTHORIZED', 'Invalid JWT', 401)
  }
}
