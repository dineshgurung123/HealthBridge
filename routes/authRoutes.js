

const express = require('express')
  const {registerUser} = require ("../controllers/authController")
  const Router = express.Router()

  Router.post('/register', registerUser )


  module.exports = Router

    