import fastify, { FastifyInstance } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { Routes } from './routes'

const server: FastifyInstance = fastify({ logger: true })
const port: number = 8080

server.register(Routes)
server.register(fastifyCors, {
   origin: '*'
})

server.listen({
   port
}, () => {
   console.log(`The server is running in url: http://localhost:${port}`)
})

