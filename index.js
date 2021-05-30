const express = require('express')
const bp = require('body-parser')
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')
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

app.post(
  '/register',
  body('email').isEmail(),
  body('email').custom(email => {
    if (users.find((user) => user.email === email)) {
      throw new Error("User already exist")
    }
    return true
  }),
  body('password').isLength({ min: 5 }),
  body('name').exists(),
  async (req, res) => {
    const { email, password, name } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const encryptedPassword = await encrypt(password)
    const newUser = { email, password: encryptedPassword, name }
    users.push(newUser)

    res.json(newUser)
  })

app.post(
  '/login',
  body('email').isEmail(),
  body('password').exists(),
  async (req, res) => {
    const { email, password } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const user = users.find(user => user.email === email)
    if (!user) return res.status(400).send("Account not registered")

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) return res.status(400).send("Incorrect password")

    res.send("succeed")
  })

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`)
})
