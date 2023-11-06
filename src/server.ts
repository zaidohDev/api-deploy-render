import Fastify from 'fastify'
import cors from '@fastify/cors'
import { routes } from './route'

const app = Fastify({ logger: true })
app.register(cors)

const start = async () => {
  await app.register(routes)

  try {
    await app.listen({ port: process.env.PORT ? Number( process.env.PORT):3333, host:"0.0.0.0" })
  } catch (error) {
    process.exit(1)
  }
}

start().then(()=> console.log("Servver Runnng ..."))
