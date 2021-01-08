import path from 'path'
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
    await request(app).post('/users').send({
      name: 'Alexsandro G Bezerra',
      email: 'alexsandro.g.bezerra@gmail.com',
      password: '123456'
    })

    const authResponse = await request(app).post('/sessions').send({
      email: 'alexsandro.g.bezerra@gmail.com',
      password: '123456'
    })

    const response = await request(app)
      .post('/events')
      .send({
        title: "New Year's eve",
        date: '2020-12-31 00:00:00.000',
        description: 'Description test',
        from: '22:00',
        to: '23:59'
      })
      .set({
        authorization: `Bearer ${authResponse.body.token}`
      })

    expect(response.body).toHaveProperty('id')
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

  it('should not be able to create a event when unauthenticated', async () => {
    await request(app).post('/users').send({
      name: 'Alexsandro G Bezerra',
      email: 'alexsandro.g.bezerra@gmail.com',
      password: '123456'
    })

    const authResponse = await request(app).post('/sessions').send({
      email: 'alexsandro.g.bezerra@gmail.com',
      password: '123456'
    })

    const responseNoToken = await request(app).post('/events').send({
      title: "New Year's eve",
      date: '2020-12-31 00:00:00.000',
      description: 'Description test',
      from: '22:00',
      to: '23:59'
    })

    const responseMalFormattedToken = await request(app)
      .post('/events')
      .send({
        title: "New Year's eve",
        date: '2020-12-31 00:00:00.000',
        description: 'Description test',
        from: '22:00',
        to: '23:59'
      })
      .set({
        authorization: authResponse.body.token
      })

    const responseInvalidToken = await request(app)
      .post('/events')
      .send({
        title: "New Year's eve",
        date: '2020-12-31 00:00:00.000',
        description: 'Description test',
        from: '22:00',
        to: '23:59'
      })
      .set({
        authorization: 'Bearer invalid-token'
      })

    expect(responseNoToken.status).toBe(401)
    expect(responseMalFormattedToken.status).toBe(401)
    expect(responseInvalidToken.status).toBe(401)
  })

  it('should be able to upload a user avatar', async () => {
    const avatar = path.resolve(__dirname, 'avatar.jpeg')

    await request(app).post('/users').send({
      name: 'Alexsandro G Bezerra',
      email: 'alexsandro.g.bezerra@gmail.com',
      password: '123456'
    })

    const authResponse = await request(app).post('/sessions').send({
      email: 'alexsandro.g.bezerra@gmail.com',
      password: '123456'
    })

    await request(app)
      .patch('/users/avatar')
      .attach('avatar', avatar)
      .set({
        authorization: `Bearer ${authResponse.body.token}`
      })

    const response = await request(app)
      .patch('/users/avatar')
      .attach('avatar', avatar)
      .set({
        authorization: `Bearer ${authResponse.body.token}`
      })

    expect(response.status).toBe(200)
  })
})
