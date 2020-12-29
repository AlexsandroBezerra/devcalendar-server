import { parseISO } from 'date-fns'
import { Router } from 'express'

import CreateEventService from '@modules/events/services/CreateEventService'

import EventsRepository from '../../typeorm/repositories/EventsRepository'

const eventRouter = Router()

eventRouter.post('/', async (request, response) => {
  const { title, date, description, from, to } = request.body

  const eventRepository = new EventsRepository()
  const createEvent = new CreateEventService(eventRepository)

  const formattedDate = parseISO(date)

  const event = await createEvent.execute({
    title,
    date: formattedDate,
    description,
    from,
    to
  })

  return response.json(event)
})

export default eventRouter
