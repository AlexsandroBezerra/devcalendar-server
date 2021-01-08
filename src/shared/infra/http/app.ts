import 'reflect-metadata'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'

import '@shared/containers'
import errorHandler from '@shared/errors/handler'

import uploadConfig from '@config/upload'

import createConnection from '../typeorm/connection'
import routes from './routes'

createConnection()

const app = express()

app.use(cors())
app.use('/files', express.static(uploadConfig.uploadFolder))

app.use(express.json())
app.use(routes)
app.use(errorHandler)

export default app
