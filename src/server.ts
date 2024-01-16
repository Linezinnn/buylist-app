import fastify, { FastifyInstance } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { Routes } from './routes'
import './database/prisma-client'
import { connectDatabase } from './database/prisma-client'

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

