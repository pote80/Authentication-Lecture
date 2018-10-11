require('dotenv').config();
const express = require('express');
const session = require('express-session');
const axios = require('axios');

const app = express();

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))

let {
  SERVER_PORT,
  REACT_APP_DOMAIN,
  REACT_APP_CLIENT_ID,
  CLIENT_SECRET
} = process.env;

app.get('/auth/callback', async (req, res) => {
  // ======= COPY PASTE START ==================
  // auth0 sending code in req.query.code
  let payload = {
    client_id: REACT_APP_CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: req.query.code,
    grant_type: 'authorization_code',
    redirect_uri: `http://${req.headers.host}/auth/callback`
  }
  // exhange code for token. token is on resWithToken.data.access_token
  let resWithToken = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload)
  // exhange token for user data
  let resWithData = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${resWithToken.data.access_token}`)
  console.log(resWithData.data)
  // === COPY PASTE END ====================
  req.session.user = resWithData.data
  res.redirect('http://localhost:3000')
})

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port: ${SERVER_PORT}`)
})
