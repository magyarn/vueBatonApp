import moment from 'moment-timezone'

export default (value) => {
  const date = new Date(value) // anything outputted by the template becomes a string, so you have to make it a date again
  const zone = moment.tz.guess()
  return moment.tz(date, zone).format('MMMM Do YYYY - h:mm a')
}
