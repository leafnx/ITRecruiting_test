interface RegisterBody {
  email: string;
  login: string;
  password: string;
}
interface LoginBody {
  login: string;
  password: string;
}

export {
  RegisterBody,
  LoginBody,
  UserInterface
}
