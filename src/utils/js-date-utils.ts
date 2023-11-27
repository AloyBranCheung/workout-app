class JsDateUtils {
  private jsDate: Date

  constructor(date = new Date()) {
    this.jsDate = date
  }

  // monday = 0 a.k.a start of week
  getStartOfWeek() {
    const day = this.jsDate.getDay() // day of week
    const diff = this.jsDate.getDate() - day + 1
    const newDate = new Date(
      this.jsDate.getFullYear(),
      this.jsDate.getMonth(),
      diff
    ) // create a new Date object
    newDate.setHours(0, 0, 0, 0) // set the time to midnight
    return newDate
  }
}

export default JsDateUtils
