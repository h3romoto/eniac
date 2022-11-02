import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()


app.use(express.json())

const port = process.env.PORT || 5000

// db and authenticateUser
import connectDB from './db/connect.js';

import * as child_process from 'node:child_process';
import * as util from 'node:util';
// terraform, async call
const execAsync = util.promisify(child_process.exec);

const terra = async () => {
  try {
    const resultPromise = execAsync('cd terraform; pwd; ls -al; terraform refresh');    //; terraform plan; terraform apply -auto-approve
    const {childProcess} = resultPromise;
    const obj = await resultPromise;
    console.log(obj.stdout);   //{ stdout: 'hello there\n', stderr: '' }
  } catch (error) {
    console.log(error)
  }
}

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

terra()
start()