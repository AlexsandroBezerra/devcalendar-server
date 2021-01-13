import { Router } from 'express'

import eventRouter from '@modules/events/infra/http/routes/events.routes'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import passwordRouter from '@modules/users/infra/http/routes/passwords.routes'
import profileRouter from '@modules/users/infra/http/routes/profile.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import userRouter from '@modules/users/infra/http/routes/users.routes'

const routes = Router()

routes.use('/users', userRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRouter)

routes.use(ensureAuthenticated)

routes.use('/profile', profileRouter)
routes.use('/events', eventRouter)

export default routes
