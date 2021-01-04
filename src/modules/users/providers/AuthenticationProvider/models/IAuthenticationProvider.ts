interface IAuthenticationProvider {
  sign(payload: string | object): string
  verify(payload: string): Promise<string | object | void>
}

export default IAuthenticationProvider
