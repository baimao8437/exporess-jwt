const express = require('express')
const bp = require('body-parser')

const app = express()
const port = 3000

// we don't have db so just use this to store user
const users = []

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.post('/register', (req, res) => {
  console.log(req.body)
  res.send('success')
})

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`)
})
