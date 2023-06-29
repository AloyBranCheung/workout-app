class msToStrTime {
  private ms: number

  constructor(ms: number) {
    this.ms = ms
  }

  private padTo2Digits(num: number) {
    return num.toString().padStart(2, "0")
  }

  public msToStrTime() {
    const hours = (this.ms / (1000 * 60 * 60)).toFixed(0)
    const minutes = this.padTo2Digits(
      Number((this.ms / (1000 * 60)).toFixed(0)) % 60
    )
    const seconds = this.padTo2Digits(Number((this.ms / 1000).toFixed(0)) % 60)
    return `${hours}:${minutes}:${seconds}`
  }
}

export default msToStrTime
