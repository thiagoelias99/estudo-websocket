import { WebSocketServer, WebSocket } from "ws"

const wss = new WebSocketServer({ port: 8080 })

wss.on("connection", (ws, request) => {
  const clientIP = request.socket.remoteAddress
  console.log(`Client connected: ${clientIP}`)

  ws.on("message", (rawData) => {
    console.log(`Received message from ${clientIP}: ${rawData.toString()}`)

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`Message from ${clientIP}: ${rawData}`)
      }
    })
  })

  ws.on("error", (error) => {
    console.error(`Error from ${clientIP}:`, error)
  })

  ws.on("close", () => {
    console.log(`Client disconnected: ${clientIP}`)
  })
})

console.log("WebSocket server is running on ws://localhost:8080")