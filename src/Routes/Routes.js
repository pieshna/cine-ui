import Login from "../auth/Login";
import Register from "../auth/Register";
import List from "../movies/List"
import Create from "../movies/Create"
import View from "../asientos/Asientos";
import Home from "../Home";
import Compra from "../compra/Compra";
import VerCombras from "../compra/VerCombras";

const routes = [
    {
        path: "/",
        element: <Home />,
        exact: true
    },
    {
        path: "/login",
        element: <Login />,
        exact: true
    },
    {
        path: "/register",
        element: <Register />,
        exact: true
    },
    {
        path: "/movie/list",
        element: <List />,
        exact: true
    },
    {
        path: "/movie/create",
        element: <Create />,
        exact: true
    },
    {
        path: "/asiento/list/:id",
        element: <View />,
        exact: true
    },
    {
        path: "/compra",
        element: <Compra />,
        exact: true
    },{
        path: "/vercompras",
        element: <VerCombras />,
        exact: true
    }

];

export default routes;
