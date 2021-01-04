import IHashProvider from '../models/IHashProvider'

class FakeHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    return payload
  }

  async compareHash(payload: string, hash: string): Promise<boolean> {
    return payload === hash
  }
}

export default FakeHashProvider
