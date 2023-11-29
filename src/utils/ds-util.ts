export class Queue {
  private queue: unknown[]
  private queueLimit: number | undefined

  constructor(queueLimit?: number) {
    this.queue = []
    this.queueLimit = queueLimit
  }

  public addToQueue(data: unknown) {
    if (this.queueLimit && this.queue.length >= this.queueLimit) {
      this.dequeueFirst()
      this.queue.push(data)
      return this.queue
    } else {
      this.queue.push(data)
      return this.queue
    }
  }

  public dequeueFirst() {
    return this.queue.shift()
  }

  public dequeueLast() {
    return this.queue.pop()
  }

  public getQueue() {
    return this.queue
  }
}
