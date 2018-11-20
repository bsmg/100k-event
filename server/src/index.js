const dotenv = require('dotenv')
const { createServer } = require('http')
const WebSocket = require('ws')

dotenv.load()
const { PORT, TOKEN } = process.env

const server = createServer()
const wss = new WebSocket.Server({ server })

wss.broadcast = function broadcast (data) {
  const payload = JSON.stringify(data)
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) client.send(payload)
  })
}

wss.on('connection', ws => {
  ws.on('message', data => {
    const { token, type, payload } = JSON.parse(data)
    if (token !== TOKEN) return undefined

    wss.broadcast({ type, payload })
  })
})

server.listen(PORT || 3000)
