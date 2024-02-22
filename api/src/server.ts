import fastify, { FastifyInstance } from 'fastify'
import { fastifyCors } from '@fastify/cors'

import { Routes } from './routes'
import { Database } from './database/prisma-client'

const server: FastifyInstance = fastify({ logger: true })
const port: number = Number(process.env.PORT) || 3333

Database.connect()

server.register(fastifyCors, {
   origin: '*'
})
server.register(Routes)

server.listen({
   port,
}, () => {
   console.log(`The server is running in url: http://localhost:${port}`)
})

