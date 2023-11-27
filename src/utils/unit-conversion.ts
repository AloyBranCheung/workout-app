export const lbsToKg = (lbs: number, decimalPlaces = 2): number => {
  return Number((lbs * 0.45359237).toFixed(decimalPlaces))
}
