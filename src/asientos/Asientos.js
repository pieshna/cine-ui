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
        total: orden.length * 25,
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
    <div className="p-5 m-10">
      {asientos.map((asiento) => (
        //console.log(asiento._id),
        <div key={asiento._id} className="mb-5">
          <h1 className="text-center text-4xl mb-5">{movie}</h1>
          <h1 className="text-center text-xl m-">Asientos</h1>
          <div className="pl-4 mb-9">
            {asiento.asientos.map((asiento, index) => (
              <>
                {asiento.column === 0 ? <br /> : null}
                <button
                  key={index}
                  className={`border border-texto p-2 m-1 w-20 h-10 ${
                    asiento.isAvailable ||
                    asiento.column === 3 ||
                    asiento.column === 4 ||
                    asiento.column === 8 ||
                    asiento.column === 9
                      ? ""
                      : "bg-red-500"
                  } ${
                    asiento.column === 3 ||
                    asiento.column === 4 ||
                    asiento.column === 8 ||
                    asiento.column === 9
                      ? "bg-gray-500"
                      : ""
                  } `}
                  disabled={asiento.isAvailable ? false : true}
                  onClick={(e) => {
                    //console.log('fila '+asiento.row+' columna '+asiento.column);
                    setOrden([
                      ...orden,
                      { row: asiento.row, column: asiento.column },
                    ]);
                    setAsientosSeleccionados([
                      ...asientosSeleccionados,
                      seleccionarAsiento(asiento.row, asiento.column),
                    ]);
                    e.target.className += "bg-green-500";
                    //console.log(recorremosArreglo(asientosSeleccionados));
                  }}
                >
                  {String.fromCharCode(65 + asiento.row) + " "}
                  {asiento.column + 1}
                </button>
              </>
            ))}
          </div>
        </div>
      ))}
      <div className="grid grid-cols-2">
        <button className="mr-auto">
          <Link
            className="border border-texto p-4 rounded-lg col-auto hover:bg-texto hover:text-white"
            to={`/movie/list`}
          >
            Regresar
          </Link>
        </button>
        <button className="ml-auto">
          <Link
            className="border border-texto p-4 rounded-lg col-auto hover:bg-texto hover:text-white"
            to={`/compra`}
            onClick={() => {
              guardamos();
            }}
          >
            Ordenar
          </Link>
        </button>
      </div>
    </div>
  );
}

export default View;
