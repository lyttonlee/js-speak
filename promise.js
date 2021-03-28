const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

class MyPromise {
  constructor (execurtor) {
    this.status = PENDING
    this.value = null
    this.reason = null
    this.resloveFunctions = []
    this.rejectFunctions = []
    execurtor(this.reslove.bind(this), this.reject.bind(this))
  }
  reslove (value) {
    if (this.status === PENDING) {
      this.value = value
      this.status = RESOLVED
      this.resloveFunctions.forEach((func) => {
        func(value)
      })
    }
  }
  reject (reason) {
    if (this.status === PENDING) {
      this.reason = reason
      this.status = REJECTED
      this.rejectFunctions.forEach((func) => {
        func(reason)
      })
    }
  }
  then (onResolved, onRejected) {
    if (this.status === RESOLVED) {
      onResolved(this.value)
    }
    if (this.status === REJECTED) {
      onRejected(this.reason)
    }
    if (this.status === PENDING) {
      this.resloveFunctions.push(onResolved)
      this.rejectFunctions.push(onRejected)
    }
  }
}

const p = new MyPromise((reslove, reject) => {
  // reslove(1)
  // reject('failed')
  setTimeout(() => {
    reslove('1s')
  }, 1000)
}).then((res) => {
  console.log(res)
  return '2'
}, (error) => {
  console.log(error)
}).then((res) => {
  console.log(res)
})