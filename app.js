const http = require('http')

const server = http.createServer((req, res) => {
  res.end("Server running")
}) 

server.listen(5000, () => {
  console.log("Started")
})x   // ← extra character causes crash

