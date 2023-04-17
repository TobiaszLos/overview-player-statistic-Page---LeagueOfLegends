export const getCsPerMinute = (cs: number, gameDuration: number): string => {
  const csPerMinuteFloat = parseFloat(
    (cs / (gameDuration / 60000)).toFixed(2)
  )
  const csPerMinuteRounded = Math.round(csPerMinuteFloat * 10) / 10
  const csPerMinuteScaled = (csPerMinuteRounded / 1000).toFixed(1)

  return csPerMinuteScaled
}