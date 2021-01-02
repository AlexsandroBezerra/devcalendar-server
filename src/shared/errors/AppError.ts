class AppError {
  public readonly code: string

  public readonly message: string

  public readonly statusCode: number

  constructor(code: string, message: string, statusCode = 400) {
    this.code = code
    this.message = message
    this.statusCode = statusCode
  }
}

export default AppError
