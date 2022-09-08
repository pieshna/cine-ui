import logo from './logo.svg';
import './App.css';
import routes from './Routes/Routes';
import { useRoutes } from 'react-router-dom';

function App() {
const element = useRoutes(routes);
return element;
}

export default App;
