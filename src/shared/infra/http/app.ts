import 'reflect-metadata'
import '../typeorm/connection'

import express from 'express'

const app = express()

app.use(express.json())

export default app
