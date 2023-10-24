import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Consultas() {
  const [listaPedidos, setListaPedidos] = useState([]);
  const [listaPedidosFiltrado, setListaPedidosFiltrado] = useState([]);
  const [textoBuscar, setTextoBuscar] = useState("");
  const [ascendente, setAscendente] = useState(1);
  const [columnaAnterior, setColumnaAnterior] = useState("idpedido");
  const [pagina, setPagina] = useState(0);
  const [filasPagina] = useState(25);
  const [numPaginas, setNumPaginas] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    const rutaServicio = "https://servicios.campus.pe/pedidos.php";
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        setListaPedidos(data);
        setListaPedidosFiltrado(data);
        setNumPaginas(Math.ceil(data.length / filasPagina));
      });
  };

  const cargarDetallePedido = (idPedido) => {
    // Store the selected ID locally for use on another page
    localStorage.setItem("selectedPedidoId", idPedido);
    // Navigate to the "ConsultasDetalles" page
    navigate(`/consultasdetalles`);
  };

  const buscarPedido = (event) => {
    const textoB = event.target.value;
    setTextoBuscar(textoB);
    const resultado = listaPedidos.filter((pedido) =>
      pedido.usuario.toUpperCase().includes(textoB.toUpperCase())
    );
    setListaPedidosFiltrado(resultado);
    setNumPaginas(Math.ceil(resultado.length / filasPagina)); // Update the number of pages based on filtered list
    setPagina(0); // Reset the current page to the first page after searching
  };

  const seleccionarColumna = (event) => {
    const columnaSeleccionada = event.target.getAttribute("columna");
    let ascendentex = ascendente;
    if (columnaAnterior === columnaSeleccionada) {
      ascendentex = -ascendentex;
    } else {
      ascendentex = 1;
    }
    setAscendente(ascendentex);
    setColumnaAnterior(columnaSeleccionada);

    setListaPedidosFiltrado(
      [...listaPedidosFiltrado].sort((a, b) => {
        const valorA = a[columnaSeleccionada];
        const valorB = b[columnaSeleccionada];
        if (valorA < valorB) {
          return -ascendentex;
        }
        if (valorA > valorB) {
          return ascendentex;
        }
        return 0;
      })
    );
  };

  const avanzar = () => {
    if (pagina < numPaginas - 1) {
      setPagina(pagina + 1);
    }
  };

  const retroceder = () => {
    if (pagina > 0) {
      setPagina(pagina - 1);
    }
  };

  const generarPaginacion = () => {
    const items = [];
    for (let i = 0; i < numPaginas; i++) {
      items.push(
        <li
          key={i}
          className={`page-item ${pagina === i ? "active" : ""}`}
          aria-current={pagina === i ? "page" : null}
        >
          <button className="page-link" onClick={() => setPagina(i)}>
            {i + 1}
          </button>
        </li>
      );
    }
    return items;
  };

  const dibujarTablaPedidos = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th columna="idpedido" onClick={seleccionarColumna}>
              ID
            </th>
            <th columna="fechapedido" onClick={seleccionarColumna}>
              Fecha
            </th>
            <th columna="usuario" onClick={seleccionarColumna}>
              Usuario
            </th>
            <th columna="nombres" onClick={seleccionarColumna}>
              Nombres
            </th>
            <th columna="total" onClick={seleccionarColumna}>
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {listaPedidosFiltrado
            .slice(pagina * filasPagina, (pagina + 1) * filasPagina)
            .map((pedido) => (
              <tr
                key={pedido.idpedido}
                onClick={() => cargarDetallePedido(pedido.idpedido)}
              >
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
 

  return (
    <section className="padded">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="mb-3">
              <input
                type="text"
                value={textoBuscar}
                onChange={buscarPedido}
                className="form-control"
                placeholder="Buscar por usuario..."
              />
            </div>
            {dibujarTablaPedidos()}
            <nav aria-label="...">
              <ul className="pagination">
                <li className={`page-item ${pagina === 0 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={retroceder}>
                    Previous
                  </button>
                </li>
                {generarPaginacion()}
                <li
                  className={`page-item ${
                    pagina === numPaginas - 1 ? "disabled" : ""
                  }`}
                >
                  <button className="page-link" onClick={avanzar}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>          
        </div>
      </div>
    </section>
  );
}


export default Consultas;
