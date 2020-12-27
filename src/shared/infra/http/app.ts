import express from 'express'

const app = express()

app.use(express.json())

console.log('testing CI')

export default app
