import { MongoQuery } from '../models/mongoquery'
import {
  RegisterBody,
  LoginBody
} from '../interface/main'
import jwt from 'jsonwebtoken';

const query = new MongoQuery;

export class Main {
  register(req, res) {
    let body: RegisterBody = req.body;
    console.log(body)

    let { email, login, password } = body;

    query.userAdd(email, login, password);

    res.send('1')
  }

  login(req, res) {
    let body: LoginBody = req.body;
    let { login, password } = body;

    let loginOrEmail = body.login.includes('@') ? 'email' : 'login';

    if ( query.userVerify(loginOrEmail, login, password) ) {

      req.session.token = jwt.sign({login: body.login}, 'privateKey')
      console.log(req.session)
      res.send('1')

    } else {
      req.session.token = null;
      res.send('0') // ошибка
    }
  }
}
