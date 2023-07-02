import dayjs from "dayjs"

const unixToIsoDate = (unix: number) => dayjs(unix).format("YYYY-MM-DD")
export default unixToIsoDate
