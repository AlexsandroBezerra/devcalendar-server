import { ErrorRequestHandler } from 'express'

import AppError from './AppError'

const errorHandler: ErrorRequestHandler = (err, request, response, _) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      statusCode: err.statusCode,
      code: err.code,
      message: err.message
    })
  }

  console.error(err)

  return response.status(500).json({
    statusCode: 500,
    code: 'INTERNAL_SERVER_ERROR'
  })
}

export default errorHandler
