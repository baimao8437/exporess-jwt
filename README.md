# Express JWT Auth

Last edit at: May 30, 2021 4:34 PM
Status: Learning
Tag: API, Auth

# Goal

1. Learn how to run a express api server
2. Learn JWT
3. Know how authentication work by JWT

# Notes

## Express Basic

---

### **Run express server**

- import express
- add route → `app.get` / `app.post` ...
- mount server on port → `app.listen(3000)`
- apply middleware → `app.use`

### Express route

- get request body → `req.body`
- return text → `res.send('hello world')`
- return json → `res.json(obj)`
- invalid request → `res.status(400).send("error message")` | `res.sendStatus(401)`

## Authentication

---

### Encrypt password

Use `bcrypt` to encrypt user password when user register

Due to security concerns, it is a good practice to hash the password with a strong hashing algorithm like SHA256

### JWT

A JSON Web Token is a based-64 encoded hash

consists of three parts: **Header,** **Payload** and **Signature**

- sign in user → `jwt.sign(payload, secretKey)`
- authenticate token → `jwt.verify(accessToken, secretKey)`

# Project

Build a simple express api server to allow user to register/login and display user info

## Dev tools

---

- [express](https://github.com/expressjs/express): main server
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken): handle jwt related feature
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js): hash user password
- [express-validator](https://github.com/express-validator/express-validator): to validate request body

## Milestone

---

### Run express server

use `nodemon` to run index.js

and test the api:

![image](https://user-images.githubusercontent.com/11513917/120097992-1d758c80-c166-11eb-9855-cf1680a59e66.png)

This extension **[Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client), can use along with a [`requests.rest`](http://requests.rest) file
will be clearer to show how to use the app**

### Register API

api to receive `email`, `password` and `name`

- ⚠️ blocker: `req.body undefined`

  Solution1:

  install body-parser
  reference: [https://akhromieiev.com/req-body-undefined-express/](https://akhromieiev.com/req-body-undefined-express/)

  Solution2:

  simply use middleware `app.use(express.json())`

**Validation:**

1. request body format
2. whether user already exist

if invalid → return error messages

if valid → Encrypt password → create a new user

![image](https://user-images.githubusercontent.com/11513917/120098009-2d8d6c00-c166-11eb-9921-e7b380acf95a.png)

### Login API

Get the email and password, check whether user registered

return JWT token when user login successfully

- ⚠️ blocker: encrypted password not matched

  when we encrypt the identical string with this `encrypt` function, it return different hash

  ![image](https://user-images.githubusercontent.com/11513917/120098023-39792e00-c166-11eb-9849-dc346c41833d.png)

  Solution:

  we can't hash the same string and compare it by bcrypt, it'll generate a different hash even the input is identical.

  there is a [bcrypt.compare](http://bcrypt.compare) to check user password according to official website

  ![image](https://user-images.githubusercontent.com/11513917/120098030-3e3de200-c166-11eb-9b12-786aa9705594.png)

once we create an access token for the user, he can pass the token through the header inside each API request: `Authorization: Bearer <accessToken>`

Best practice: Do not add sensitive data to the payload

Here we only put `{ username: [user.name](http://user.name) }` as payload for demo purpose

### Authenticate API

Just gonna add a simple `user_info` api to return user object

Before that, we need to add a authenticate token middleware for all apis need to be authorized

use `jwt.verify` to check the `authorization` is the correct token

if it's authorized, we can attach the `payload` into our request and go to next step

here the payload will be `{ username: <user.name> }`

![image](https://user-images.githubusercontent.com/11513917/120098043-45fd8680-c166-11eb-8801-03e9e71c074b.png)

# Reference

[https://www.youtube.com/watch?v=mbsmsi7l3r4&ab_channel=WebDevSimplified](https://www.youtube.com/watch?v=mbsmsi7l3r4&ab_channel=WebDevSimplified)

[Handling Authentication in Express.js](https://stackabuse.com/handling-authentication-in-express-js/)

[Token Based Authentication Made Easy - Auth0](https://auth0.com/learn/token-based-authentication-made-easy/)
