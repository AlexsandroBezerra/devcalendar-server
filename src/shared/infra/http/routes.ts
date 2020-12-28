import { Router } from 'express'

import eventRouter from '@modules/events/infra/http/routes/events.routes'

const routes = Router()

routes.use('/events', eventRouter)

export default routes
