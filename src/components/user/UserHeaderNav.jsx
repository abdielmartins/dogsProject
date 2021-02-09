import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { ReactComponent as MyPhotos } from "../../assets/feed.svg";
import { ReactComponent as Stats } from "../../assets/estatisticas.svg";
import { ReactComponent as AddPhoto } from "../../assets/adicionar.svg";
import { ReactComponent as Logout } from "../../assets/sair.svg";

const UserHeaderNav = () => {
  const { userLogout } = useContext(UserContext);

  return (
    <nav>
      <NavLink to="account">
        <MyPhotos /> Minhas Fotos
      </NavLink>
      <NavLink to="account/stats">
        <Stats /> Estatísticas
      </NavLink>
      <NavLink to="account/post">
        <AddPhoto /> Adicionar Foto
      </NavLink>
      <button onClick={userLogout}>
        <Logout /> Sair
      </button>
    </nav>
  );
};

export default UserHeaderNav;
