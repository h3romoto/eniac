import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()

app.use(express.json())

const port = process.env.PORT || 5000

// db and authenticateUser
import connectDB from './db/connect.js';

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()