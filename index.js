const express = require('express')
const bp = require('body-parser')
const encrypt = require('./encrypt')

const app = express()
const port = 3000

// we don't have db so just use this to store user
const users = []

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.post('/register', async (req, res) => {
  const { email, password, name } = req.body

  if (users.find((user) => user.email === email)) {
    res.status(400).send('User already exist')
  }

  const encryptedPassword = await encrypt(password)
  const newUser = { email, password: encryptedPassword, name }
  users.push(newUser)

  res.json(newUser)
})

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`)
})
