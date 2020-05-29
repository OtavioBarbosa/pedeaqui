
import Login from "./views/Login.jsx";
import Cadastrar_se from "./views/Cadastrar_se.jsx";

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
];

export default routes;
