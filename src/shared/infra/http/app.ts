import 'reflect-metadata'
import express from 'express'
import 'express-async-errors'

import '../../containers'
import errorHandler from '@shared/errors/handler'

import createConnection from '../typeorm/connection'
import routes from './routes'

createConnection()

const app = express()

app.use(express.json())
app.use(routes)
app.use(errorHandler)

export default app
