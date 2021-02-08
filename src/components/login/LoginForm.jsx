import { Link } from "react-router-dom";
import { useContext } from "react";

import Input from "../forms/Input";
import Button from "../forms/Button";
import useForm from "../../hooks/useForm";
import { UserContext } from "../../context/userContext";
import Error from "../../helper/error";

import styles from "./LoginForm.module.css";
import stylesButton from "../forms/Button.module.css";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const { userLogin, error, loading } = useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error} />
      </form>
      <Link className={styles.lost} to="/login/lost">
        Perdeu a Senha?
      </Link>
      <div className={styles.signIn}>
        <h2 className={styles.subTitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
      </div>
      <Link className={stylesButton.button} to="/login/create">
        Cadastro
      </Link>
    </section>
  );
};

export default LoginForm;
