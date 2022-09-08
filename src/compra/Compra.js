import {React, Component} from 'react';
import { Link } from 'react-router-dom';

class Compra extends Component {
    constructor(){
        super();
        this.state = {
            datos: []
        }
    }
    componentDidMount() {
        this.setState({
            datos: sessionStorage.getItem('orden')
        })
    }
    render() {
        const comprar=()=>{
            fetch(process.env.REACT_APP_API+'/compra/list' , {
                method: 'POST',
                body: this.state.datos,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.error(err));
        
        }
        return (
            <div>
                <h1>Compra</h1>
                <p>Orden: {this.state.datos}</p>
                <Link to="/vercompras" onClick={comprar}>Comprar</Link>
                <Link to="/">Home</Link>
            </div>
        )
    }
}

export default Compra;
