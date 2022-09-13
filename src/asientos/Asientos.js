//create a view that shows the list of asientos by api call to backend and display the asientos
//the paramether id that is send to api call is the id of the movie that is recived from the url

import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

function View() {
  const [asientos, setAsientos] = useState([]);
  const [error, setError] = useState("");
  const { id } = useParams();
  const [movie, setMovie] = useState("");
  const [orden, setOrden] = useState([]);
  const [asientosSeleccionados, setAsientosSeleccionados] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/asiento/list/${id}`)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        if (data.error) {
          setError(data.error);
        } else {
          setAsientos(data);
        }
      });
    fetch(`${process.env.REACT_APP_API}/movie/list/${id}`)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.title);
        if (data.error) {
          setError(data.error);
        } else {
          setMovie(data.title);
        }
      });
  }, []);

  const guardamos = () => {
    sessionStorage.setItem(
      "orden",
      JSON.stringify({
        userId: sessionStorage.getItem("id"),
        movieId: id,
        asientos: recorremosArreglo(asientosSeleccionados),
        total: 100,
        pago: "efectivo",
        butacas: orden,
      })
    );
  };

  const recorremosArreglo = (e) => {
    let asientos = "";
    for (let i = 0; i < e.length; i++) {
      if (asientos === "") {
        asientos += e[i];
      } else {
        asientos += "," + e[i];
      }
    }

    return asientos;
  };

  const seleccionarAsiento = (row, column) => {
    const letra = String.fromCharCode(65 + row);
    const numero = column + 1;
    const asiento = letra + numero;
    return asiento;
  };

  return (
    <div>
      <h1>Asientos</h1>
      <table>
        <thead>
          <tr>
            <th>Pelicula</th>
            <th>Asientos</th>
          </tr>
        </thead>
        <tbody>
          {asientos.map((asiento) => (
            //console.log(asiento._id),
            <tr key={asiento._id}>
              <td>{movie}</td>
              <td>
                {asiento.asientos.map((asiento, index) => (
                  <button
                    key={index}
                    className={`${asiento.column == 0 ? "btn" : null} ${
                      asiento.isAvailable == false ? "disabled" : null
                    }`}
                    onClick={() => {
                      //console.log('fila '+asiento.row+' columna '+asiento.column);
                      setOrden([
                        ...orden,
                        { row: asiento.row, column: asiento.column },
                      ]);
                      setAsientosSeleccionados([
                        ...asientosSeleccionados,
                        seleccionarAsiento(asiento.row, asiento.column),
                      ]);
                      //console.log(recorremosArreglo(asientosSeleccionados));
                    }}
                  >
                    {" "}
                    {asiento.column + 1} {asiento.isAvailable ? "si" : "no"}
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/movie/list`}>Back</Link>
      <Link
        to={`/compra`}
        onClick={() => {
          guardamos();
        }}
      >
        Orden
      </Link>
    </div>
  );
}

export default View;
