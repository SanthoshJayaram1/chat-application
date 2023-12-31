// const res = require('express/lib/response')
const jwt = require('jsonwebtoken')

module.exports.generateActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '30m'})
}

module.exports.generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'})
}

module.exports.generateRefreshToken = (payload, res) => {
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'})
 
  res.cookie('wechat_rfToken', token, {
    path: '/api/v1/auth/refresh_token',
    secure: true,
    sameSite:'none',
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })

  return token
}