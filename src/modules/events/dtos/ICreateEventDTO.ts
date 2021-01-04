interface ICreateEventDTO {
  userId: string
  title: string
  description?: string
  date: Date
  from?: number
  to?: number
}

export default ICreateEventDTO
