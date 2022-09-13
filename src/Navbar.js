import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-fondoOscuro">
      <nav className="flex items-center justify-between flex-wrap bg-fondoOscuro p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            <Link to="/">🖼️Logo</Link>
          </span>
        </div>
        <div>
          <button className="text-white">

          <Link to="/vercompras">Mis Compras</Link>
          </button>
          <button className="ml-4 text-white" onClick={()=>{sessionStorage.clear()}} >
            <Link to="/login">Cerrar Sesión</Link>
          </button>
          
        </div>
      </nav>
    </div>
  );
}
