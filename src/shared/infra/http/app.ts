import express from 'express'

const app = express()

app.use(express.json())

console.log('test ci')

export default app
