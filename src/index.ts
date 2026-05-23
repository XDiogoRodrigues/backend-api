import "dotenv/config"

import express from 'express';

import userRouter from '../src/routers/User.js'

const app = express()

app.use(express.json())

const port = process.env.PORT || 7000;

app.use('/api', userRouter)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port} 🚀🚀.`)
})