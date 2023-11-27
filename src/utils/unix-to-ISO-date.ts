import dayjs from "dayjs"

const unixToIsoDate = (unix: number | string) =>
  dayjs(unix).format("YYYY-MM-DD")
export default unixToIsoDate
