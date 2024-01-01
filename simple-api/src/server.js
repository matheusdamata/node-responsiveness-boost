import http from 'node:http'

const processId = process.pid

const server = http.createServer((req, res) => {
  for (let i = 0; i < 1e7; i++);

  res.end(`Handled by process ${processId}`)
})

server.listen(3000)
.once('listening', () => console.log(`Server started in process ${processId}`))

// Aguardar as conexões serem encerradas para só então encerrar o processo	
process.on('SIGTERM', () => {
  console.log('server ending', new Date().toISOString())
  server.close(() => process.exit())
})