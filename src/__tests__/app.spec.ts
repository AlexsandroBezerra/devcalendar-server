import request from 'supertest'
import { Connection, getConnection } from 'typeorm'

import app from '@shared/infra/http/app'
import createConnection from '@shared/infra/typeorm/connection'

let connection: Connection

describe('App', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection')

    await connection.query('DROP TABLE IF EXISTS events')
    await connection.query('DROP TABLE IF EXISTS users')
    await connection.query('DROP TABLE IF EXISTS migrations')

    await connection.runMigrations()
  })

  beforeEach(async () => {
    await connection.query('DELETE FROM events')
    await connection.query('DELETE FROM users')
  })

  afterAll(async () => {
    const mainConnection = getConnection()

    await connection.close()
    await mainConnection.close()
  })

  it('should be able to create a new event', async () => {
    const response = await request(app).post('/events').send({
      title: "New Year's eve",
      date: '2020-12-31 00:00:00.000',
      description: 'Description test'
    })

    expect(response.body).toEqual(
      expect.objectContaining({
        title: "New Year's eve",
        description: 'Description test'
      })
    )
  })

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'Alexsandro G Bezerra',
      email: 'alexsandro.g.bezerra@gmail.com',
      password: '123456'
    })

    const user = response.body

    expect(user).toHaveProperty('id')
    expect(user).toEqual(
      expect.objectContaining({
        name: 'Alexsandro G Bezerra',
        email: 'alexsandro.g.bezerra@gmail.com'
      })
    )
  })
})
