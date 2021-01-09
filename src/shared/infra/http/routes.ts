import { Router } from 'express'

import eventRouter from '@modules/events/infra/http/routes/events.routes'
import passwordRouter from '@modules/users/infra/http/routes/passwords.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import userRouter from '@modules/users/infra/http/routes/users.routes'

const routes = Router()

routes.use('/users', userRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/events', eventRouter)

routes.use('/password', passwordRouter)

export default routes
