import { React, Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";

class VerCombras extends Component {
  constructor() {
    super();
    this.state = {
      datos: [],
    };
  }
  componentDidMount() {
    fetch(`${process.env.REACT_APP_API}/compra/list/${sessionStorage.getItem("id")}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ datos: data });
      })
      .catch((err) => console.error(err));
  }
  render() {
    return (
      <div className="p-9 m-auto">
        <h1 className="font-bold text-2xl text-center mb-6">Compras</h1>
        <table className="m-auto table-auto mb-10">
          <thead>
            <tr>
              <th className="border border-texto px-12 py-2">Pelicula</th>
              <th className="border border-texto px-12 py-2">Asientos</th>
              <th className="border border-texto px-12 py-2">Total</th>
              <th className="border border-texto px-12 py-2">Pago</th>
            </tr>
          </thead>
          <tbody>
            {this.state.datos.map((dato) => (
              <tr key={dato._id}>
                <td className="border border-texto px-2">
                  {" "}
                  <Child data={dato.movieId} />{" "}
                </td>
                <td className="border border-texto px-2">{dato.asientos}</td>
                <td className="border border-texto px-2">{dato.total}</td>
                <td className="border border-texto px-2">{dato.pago}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link className="border border-texto hover:bg-texto hover:text-white p-4 rounded-xl" to="/">Regresar</Link>
      </div>
    );
  }
}

const Child = ({ data }) => {
  const [movie, setMovie] = useState("");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/movie/list/${data}`)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.title);

        setMovie(data.title);
      });
  }, []);
  return <div>{movie}</div>;
};

export default VerCombras;
