//make a register view with a form that has email, name, lastname , password, identity, telephone, payment method and a submit button that sends the data to the backend
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [identity, setIdentity] = useState("");
  const [telephone, setTelephone] = useState("");
  const [payment, setPayment] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        lastname,
        password,
        identity,
        telephone,
        payment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTimeout(() => {
            navigate("/login");
            }, 2000);
        if (data.error) {
          setError(data.error);
        } else {
          setError("");
        }
      });
  };

  return (
    <div className="w-screen h-screen grid">
        <div className="m-auto shadow-xl rounded-lg p-10">
            <h1 className="text-3xl font-bold text-center mb-3">Registrarse</h1>
      <form onSubmit={handleSubmit}>
        <p className="ml-1">Correo</p>
        <input
        className="border-2 border-gray-300 p-2 rounded-lg w-80 mt-1 mb-1"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="ml-1">Nombre</p>
        <input
        className="border-2 border-gray-300 p-2 rounded-lg w-80 mt-1 mb-1"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="ml-1">Apellido</p>
        <input
        className="border-2 border-gray-300 p-2 rounded-lg w-80 mt-1 mb-1"
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <p className="ml-1">Contraseña</p>
        <input
        className="border-2 border-gray-300 p-2 rounded-lg w-80 mt-1 mb-1"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="ml-1">Identidad</p>
        <input
        className="border-2 border-gray-300 p-2 rounded-lg w-80 mt-1 mb-1"
          type="text"
          value={identity}
          onChange={(e) => setIdentity(e.target.value)}
        />
        <p className="ml-1">Telefono</p>
        <input
        className="border-2 border-gray-300 p-2 rounded-lg w-80 mt-1 mb-1"
          type="text"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />
        <p className="ml-1">Tipo de pago</p>
        
        <select
          className="border-2 border-gray-300 p-2 rounded-lg w-80 mt-1 mb-1"
                defaultValue={"0"}
                onChange={(e) =>
                    setPayment(e.target.value)
                }
              >
                <option value="0" disabled>
                  Metodo de pago
                </option>
                <option value="Efectivo">Efectivo</option>
                <option value="Tarjeta">Tarjeta</option>
              </select>
        <br />
        <div className="grid grid-cols-2 mt-2">
        
        <button className="border border-texto hover:bg-texto hover:text-white rounded-lg p-3 col-auto mr-auto"><Link to='/login'>Regresar</Link></button>
        <button className="border border-texto hover:bg-texto hover:text-white rounded-lg p-3 col-auto ml-auto" type="submit">Register</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Register;
