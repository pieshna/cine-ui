import Login from "../auth/Login";
import Register from "../auth/Register";
import List from "../movies/List"
import Create from "../movies/Create"

const routes = [
    {
        path: "/",
        element: <Login />,
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

];

export default routes;
