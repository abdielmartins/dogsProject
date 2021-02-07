import { Link } from "react-router-dom";
import { useContext } from "react";

import Input from "../forms/Input";
import Button from "../forms/Button";
import useForm from "../../hooks/useForm";
import { UserContext } from "../../context/userContext";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const { userLogin } = useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <div>
      <section>
        Login Form
        <h1>Login</h1>
        <form action="" onSubmit={handleSubmit}>
          <Input label="Usuário" type="text" name="username" {...username} />
          <Input label="Senha" type="password" name="password" {...password} />
          <Button>Entrar</Button>
        </form>
      </section>
      <Link to="/login/create">Cadastro</Link>
    </div>
  );
};

export default LoginForm;
