import { React, Component } from "react";
import { Link, useNavigate } from "react-router-dom";

class Compra extends Component {
  constructor() {
    super();
    this.state = {
      datos: [],
      datos1: [],
    };
  }
  componentDidMount() {
    this.setState({
      datos: JSON.parse(sessionStorage.getItem("orden")),
      datos1: sessionStorage.getItem("orden"),
    });
  }
  render() {
    const comprar = () => {
      fetch(process.env.REACT_APP_API + "/compra/create", {
        method: "POST",
        body: this.state.datos1,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.error(err));
    };
    return (
      <div className="p-9 mt-5">
        <h1 className="text-center font-bold text-4xl m-8">Confirmar Compra</h1>
            <p className="text-center font-semibold text-xl">
          Detalles de su compra: 
        </p>
        <div className="mb-9 p-6">
            <p className="text-center text-md mt-2">Asiento(s) escogido(s): {this.state.datos.asientos}</p>
            <p className="text-center text-md mt-2">Total a pagar: Q.{this.state.datos.total}</p>
            <p className="text-center text-md mt-2">Su pago es: {this.state.datos.pago}</p>
        </div>
        
        <div className="grid grid-cols-2">
          <button className="mr-auto">
            <Link className="border border-texto p-4 rounded-xl hover:bg-texto hover:text-white" to={`/asiento/list/${this.state.datos.movieId}`}>Home</Link>
          </button>
          <button className="ml-auto">
            <Link className="border border-texto p-4 rounded-xl hover:bg-texto hover:text-white" to="/" onClick={comprar}>
              Comprar
            </Link>
          </button>
        </div>
      </div>
    );
  }
}

export default Compra;
