import fastify, { FastifyInstance } from 'fastify'
import { fastifyCors } from '@fastify/cors'

import { connectDatabase } from './database/prisma-client'
import { Routes } from './routes'

const server: FastifyInstance = fastify({ logger: true })
const port: number = 8080

connectDatabase()

server.register(fastifyCors, {
   origin: '*'
})
server.register(Routes)

server.listen({
   port,
}, () => {
   console.log(`The server is running in url: http://localhost:${port}`)
})

