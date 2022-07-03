import express, { Express } from 'express'
import { RequestHandler } from 'express-serve-static-core'
import cors from 'cors'
import weatherController from './domain/weather/weather.controller'
const app: Express = express()

app.use(express.urlencoded({ extended: true }) as RequestHandler)
app.use(express.json() as RequestHandler)
app.use(cors({}))
const port: number = Number(process.env.PORT) || 8050
app.use(express.static('dist'))
app.use('/api', weatherController)

app.listen(port)
console.log(`App listening on ${port}`)
