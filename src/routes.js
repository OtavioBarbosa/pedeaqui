
import Login from "./pages/Login.jsx"
import Cadastrar_se from "./pages/Cadastrar_se.jsx"
import Opcao from "./pages/Opcao.jsx"
import Cardapio from "./pages/Cardapio.jsx"
import Estabelecimentos from "./pages/Estabelecimentos.jsx"
import IdentificarMesa from "./pages/IdentificarMesa"

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
  {
    path: "/identificarmesa",
    name: "Identificar mesa que usuário irá se conectar",
    icon: "",
    component: IdentificarMesa,
    layout: "/pedeaqui"
  },
]

export default routes
