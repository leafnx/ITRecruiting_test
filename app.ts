import express from 'express';
import session from 'express-session';
import { routes } from './routes/routes';

const app = express()
const port = 3000

const sessionSecret = 'secretsessionid'

app.use(express.json())
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true
}))

routes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
