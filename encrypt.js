const bcrypt = require('bcrypt')
const saltRounds = 10

const encrypt = async (plainText) => {
  const encrypted = await bcrypt.hash(plainText, saltRounds)
  return encrypted
}

module.exports = encrypt
