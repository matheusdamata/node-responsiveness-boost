import os from 'node:os'
import cluster from 'node:cluster'

const runPrimaryProcess = () => {
  const processesCount = os.cpus().length * 2
  console.log(`Primary ${process.pid} is running`)
  console.log(`Forking Server with ${processesCount} processes \n`)

  for (let i = 0; i < processesCount; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} died... Starting a new worker`)
      cluster.fork()
    }
  })
}

const runWorkerProcess = async () => {
  await import('./server.js')
}

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess()