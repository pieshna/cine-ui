//login with email and password by api call to backend
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        if (data.error) {
          setError(data.error);
        } else {
          setError("");
          sessionStorage.setItem("id", data.user._id);
          setTimeout(() => {
            navigate("/movie/list");
          }, 1000);
          //console.log(data.user._id)
        }
      });
  };

  return (
    <div className="w-screen h-screen grid">
      <div className="m-auto shadow-xl rounded-lg p-12">
        <form onSubmit={handleSubmit}>
          <p className="ml-1">Correo</p>
          <input
          className="border-2 border-gray-300 p-2 rounded-lg w-80 mt-2 mb-2"
            type="email"
            value={email}
            placeholder="hola123@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="ml-1">Contraseña</p>
          <input
          className="border-2 border-gray-300 p-2 rounded-lg w-80 mt-2 mb-2"
            type="password"
            value={password}
            placeholder="******** 👈 123456"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <div className="grid">
          <button className="border bg-gray-300 border-texto hover:bg-texto hover:text-white rounded-md p-2" type="submit">Iniciar Sesion</button>
          </div>
        </form>
        <p className="text-center mt-5">No tienes cuenta? <Link className="text-blue-600" to="/register" >Registrate Aqui</Link></p>
      </div>
    </div>
  );
}

export default Login;
