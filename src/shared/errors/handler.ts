import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup'

import AppError from './AppError'

interface IValidationErrors {
  [key: string]: string[]
}

const errorHandler: ErrorRequestHandler = (err, request, response, _) => {
  if (err instanceof ValidationError) {
    const errors: IValidationErrors = {}

    err.inner.forEach(error => {
      if (error.path) {
        errors[error.path] = error.errors
      }
    })

    return response.status(400).json({ message: 'Validation fails', errors })
  }

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
