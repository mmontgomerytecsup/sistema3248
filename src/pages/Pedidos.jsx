import { useEffect, useState } from "react";

function Pedidos() {
  const [listaPedidos, setListaPedidos] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    const rutaServicio = "https://servicios.campus.pe/pedidos.php";
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        setListaPedidos(data);
      });
  };

  const cargarDetallePedido = (idPedido) => {
    const rutaDetalleServicio = `https://servicios.campus.pe/pedidosdetalle.php?idpedido=${idPedido}`;
    setPedidoSeleccionado(null); // Reset the previous order detail
    fetch(rutaDetalleServicio)
      .then((response) => response.json())
      .then((data) => {
        setPedidoSeleccionado(data);
      });
  };
  
  

  const dibujarTablaPedidos = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Nombres</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {listaPedidos.map((pedido) => (
            <tr key={pedido.idpedido} onClick={() => cargarDetallePedido(pedido.idpedido)}>
              <td>{pedido.idpedido}</td>
              <td>{pedido.fechapedido}</td>
              <td>{pedido.usuario}</td>
              <td>{pedido.nombres}</td>
              <td>{pedido.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  


  const dibujarDetallePedido = () => {
    if (pedidoSeleccionado) {
      return (
        <div>
          <h3>Detalle del Pedido</h3>
          {pedidoSeleccionado.map((pedido) => (
            <div key={pedido.idpedido}>
              <p>ID del Pedido: {pedido.idpedido}</p>
              <p>Nombre: {pedido.nombre}</p>
              {/* Include other details of the order */}
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <h3>Detalle del Pedido</h3>
          <p>No se ha seleccionado ningún pedido.</p>
        </div>
      );
    }
  };
  
  

  return (
    <section className="padded">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            {dibujarTablaPedidos()}
          </div>
          <div className="col-md-6">
            {dibujarDetallePedido()}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pedidos;
