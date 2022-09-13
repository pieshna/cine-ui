import logo from './logo.svg';
import './App.css';
import routes from './Routes/Routes';
import { useRoutes } from 'react-router-dom';
import Navbar from './Navbar';

function App() {
const element = useRoutes(routes);
return (
  <div className='bg-fondoClaro min-h-screen'>
  {sessionStorage.getItem('id')? <Navbar />:null}
  {element}
  </div>
)
}

export default App;
