import moment from "moment"

export const timeFormat = (timestamps: number, action: 'fromNow' | 'duration' ) => {
  if (action === 'fromNow') {
    return moment(timestamps).fromNow()
  } else if (action === 'duration') {
    const duration = moment.duration(timestamps, 'seconds')

    return `${duration.minutes()}m ${duration.seconds()}s`
  }
}