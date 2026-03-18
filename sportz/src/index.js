import express from 'express'

const app = express()
const port = 3333

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Olá — servidor rodando!' })
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
});

