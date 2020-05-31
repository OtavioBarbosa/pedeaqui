
import Login from "./views/Login.jsx";
import Cadastrar_se from "./views/Cadastrar_se.jsx";
import Opcao from "./views/Opcao.jsx";

var routes = [
  {
    path: "/",
    name: "Login",
    icon: "",
    component: Login,
    layout: "/"
  },
  {
    path: "login",
    name: "Login",
    icon: "",
    component: Login,
    layout: "/"
  },
  {
    path: "cadastrarse",
    name: "Cadastrar-se",
    icon: "",
    component: Cadastrar_se,
    layout: "/"
  },
  {
    path: "/opcao",
    name: "Escolha o que deseja fazer",
    icon: "",
    component: Opcao,
    layout: "/pedeaqui"
  },
];

export default routes;
