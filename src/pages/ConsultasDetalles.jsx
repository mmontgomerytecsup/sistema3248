import React, { useEffect, useState } from "react";
import noImage from './../assets/images/no-image.svg';
import { Link } from "react-router-dom";

function ConsultasDetalles() {
  const [pedidoDetalles, setPedidoDetalles] = useState(null);

  useEffect(() => {
    const selectedPedidoId = localStorage.getItem("selectedPedidoId");
    if (selectedPedidoId) {
      // Fetch the details of the pedido using selectedPedidoId
      const rutaDetalleServicio = `https://servicios.campus.pe/pedidosdetalle.php?idpedido=${selectedPedidoId}`;
      fetch(rutaDetalleServicio)
        .then((response) => response.json())
        .then((data) => {
          setPedidoDetalles(data);
        });
    }
  }, []);

  const dibujarCuadricula = () => {
    if (pedidoDetalles) {
      return (
        <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2 g-4">
          {pedidoDetalles.map((pedido) => (
            <div className="col" key={pedido.idpedido}>
              <div className="card h-100">
                <figure className="image-content">
                  
                <img
                  src={`https://servicios.campus.pe/${pedido.imagenchica}`}
                  className="card-img-top"
                  alt="..."
                />
                  
                </figure>
                <div className="card-body">
                  <h5 className="card-title">Pedido ID: {pedido.idpedido}</h5>
                  <p className="card-text">Nombre: {pedido.nombre}</p>
                  {/* Render other details of the pedido */}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="container">
          <h3>Detalle del Pedido</h3>
          <p>No se ha seleccionado ningún pedido.</p>
        </div>
      );
    }
  };
  
  return (
    <section className="padded">
      <div className="container">
        <h1>Consultas Detalle</h1>
        {dibujarCuadricula()}
      </div>
    </section>
  );
}

export default ConsultasDetalles;
