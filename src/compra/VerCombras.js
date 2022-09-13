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
      <div>
        <h1>Compras</h1>
        <table>
          <thead>
            <tr>
              <th>Pelicula</th>
              <th>Asientos</th>
              <th>Total</th>
              <th>Pago</th>
            </tr>
          </thead>
          <tbody>
            {this.state.datos.map((dato) => (
              <tr key={dato._id}>
                <td>
                  {" "}
                  <Child data={dato.movieId} />{" "}
                </td>
                <td>{dato.asientos}</td>
                <td>{dato.total}</td>
                <td>{dato.pago}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link to="/">Home</Link>
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
