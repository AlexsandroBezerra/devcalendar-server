import request from 'supertest'
import { Connection, getConnection } from 'typeorm'

import app from '@shared/infra/http/app'
import createConnection from '@shared/infra/typeorm/connection'

let connection: Connection

describe('App', () => {
  beforeAll(async () => {
    connection = await createConnection()

    await connection.query('DROP TABLE IF EXISTS events')
    await connection.query('DROP TABLE IF EXISTS migrations')

    await connection.runMigrations()
  })

  beforeEach(async () => {
    await connection.query('DELETE FROM events')
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
        date: '2020-12-31T03:00:00.000Z',
        description: 'Description test'
      })
    )
  })
})
