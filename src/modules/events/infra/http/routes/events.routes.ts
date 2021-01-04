import { parseISO } from 'date-fns'
import { Router } from 'express'
import { container } from 'tsyringe'

import CreateEventService from '@modules/events/services/CreateEventService'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const eventRouter = Router()

eventRouter.use(ensureAuthenticated)

eventRouter.post('/', async (request, response) => {
  const userId = request.user.id
  const { title, date, description, from, to } = request.body

  const createEvent = container.resolve(CreateEventService)

  const formattedDate = parseISO(date)

  const event = await createEvent.execute({
    userId,
    title,
    date: formattedDate,
    description,
    from,
    to
  })

  return response.json(event)
})

export default eventRouter
