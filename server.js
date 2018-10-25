'use strict'
const path = require('path')
const { MongoClient, Server } = require('mongodb')
const express = require('express')
const app = express()

// Set up the connection to the local db
let mongoclient = new MongoClient("mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PORT, {
  useNewUrlParser: true,
  replicaSet: 'rs0',
  authSource: 'admin',
  auth: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
})

// Open the connection to the server
let mongoConnected = "Not connected yet"
mongoclient.connect()
  .then(res => {
    mongoConnected = "I am connected!"
  })
  .catch(e => {
    mongoConnected = "Error: " + e.message
  })

app.use((req, res) => {
  res.send("Hallo world!\n" + mongoConnected)
})

/*
// Uploaded files
app.post('/images', require('./serverUpload'))
app.use('/images', (req, res, next) => {
  express.static(__dirname + '/upload')(req, res, next)
})

// Static resources
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'))
app.use('/static', express.static(__dirname))

// Apps
app.use('/test', (req, res) => {
  res.sendFile(path.resolve(__dirname, './testIndex.html'))
})

app.use('/compat', (req, res) => {
  res.sendFile(path.resolve(__dirname, './indexCompat.html'))
})

app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'))
})
*/

// *** SERVER ERROR HANDLER ***
app.use(function (err, req, res, next) {
    console.log(err)
    return res.status(404).json({
        error: 'Server error',
        err: err
    })
})


/*
    ********** /END ERROR HANDLING **********
*/

module.exports = function (PORT, done) {
  const msg = '*** Listening on port: ' + PORT + ' ***'
  console.log(
    ' '  + '*'.repeat(msg.length) + '\n', msg + '\n', '*'.repeat(msg.length)
  )
  return app.listen(PORT, done)
}

module.exports(process.env.PORT || 8080)
