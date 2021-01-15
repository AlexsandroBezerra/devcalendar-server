export function convertMinutesToTime(minutesToConvert: number): string {
  const hours = minutesToConvert / 60
  const roundedHours = Math.floor(hours)

  const minutes = (hours - roundedHours) * 60
  const roundedMinutes = Math.round(minutes)

  const formattedHour = String(roundedHours).padStart(2, '0')
  const formattedMinutes = String(roundedMinutes).padStart(2, '0')

  return `${formattedHour}:${formattedMinutes}`
}
