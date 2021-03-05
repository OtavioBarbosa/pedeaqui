
import Login from "./views/Login.jsx";
import Cadastrar_se from "./views/Cadastrar_se.jsx";
import Opcao from "./views/Opcao.jsx";
import Cardapio from "./views/Cardapio.jsx";
import Estabelecimentos from "./views/Estabelecimentos.jsx";

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
  {
    path: "/estabelecimentos",
    name: "Escolha o restaurante para exibir o cardápio",
    icon: "",
    component: Estabelecimentos,
    layout: "/pedeaqui"
  },
  {
    path: "/cardapio/:restaurante",
    name: "Exibir o cardápio do restaurante escolhido",
    icon: "",
    component: Cardapio,
    layout: "/pedeaqui"
  },
];

export default routes;
