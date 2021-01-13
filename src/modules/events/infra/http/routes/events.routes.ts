import { parseISO } from 'date-fns'
import { Router } from 'express'
import { container } from 'tsyringe'
import * as Yup from 'yup'

import CreateEventService from '@modules/events/services/CreateEventService'

const eventRouter = Router()

eventRouter.post('/', async (request, response) => {
  const userId = request.user.id
  const { title, date, description, from, to } = request.body

  const createEvent = container.resolve(CreateEventService)

  const formattedDate = parseISO(date)

  const schema = Yup.object().shape({
    userId: Yup.string().required(),
    title: Yup.string().required('Title is required'),
    date: Yup.date().required(),
    description: Yup.string(),
    from: Yup.string(),
    to: Yup.string()
  })

  const data = {
    userId,
    title,
    date: formattedDate,
    description,
    from,
    to
  }

  await schema.validate(data, {
    abortEarly: false
  })

  const event = await createEvent.execute(data)

  return response.json(event)
})

export default eventRouter
