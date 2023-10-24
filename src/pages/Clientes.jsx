import { useEffect, useState } from "react";
import { ApiWebURL } from "../utils";

function Clientes() {
  const [listaClientes, setListaClientes] = useState([]);
  const [listaClientesFiltrado, setListaClientesFiltrado] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [ascendente, setAscendente] = useState(1);
  const [columnaAnterior, setColumnaAnterior] = useState("empresa");
  const [textoBuscar, setTextoBuscar] = useState("");
  const [pagina, setPagina] = useState(0);
  const [filasPagina] = useState(20);
  const [numPaginas, setNumPaginas] = useState(0);

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = async () => {
    const rutaServicio = ApiWebURL + "servicioclientes.php";
    const response = await fetch(rutaServicio);
    const data = await response.json();
    setListaClientes(data);
    setListaClientesFiltrado(data);
    setCargando(false);
    setNumPaginas(Math.ceil(data.length / filasPagina));
  };

  const dibujarTabla = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th columna="idcliente" onClick={(event) => seleccionarColumna(event)}>
              ID Cliente
            </th>
            <th columna="usuario" onClick={(event) => seleccionarColumna(event)}>
              Usuario
            </th>
            <th columna="empresa" onClick={(event) => seleccionarColumna(event)}>
              Empresa
            </th>
            <th columna="nombres" onClick={(event) => seleccionarColumna(event)}>
              Nombres
            </th>
            <th columna="correo" onClick={(event) => seleccionarColumna(event)}>
              Correo
            </th>
            <th columna="cargo" onClick={(event) => seleccionarColumna(event)}>
              Cargo
            </th>
            <th columna="direccion" onClick={(event) => seleccionarColumna(event)}>
              Dirección
            </th>
            <th columna="ciudad" onClick={(event) => seleccionarColumna(event)}>
              Ciudad
            </th>
            <th columna="region" onClick={(event) => seleccionarColumna(event)}>
              Región
            </th>
            <th columna="pais" onClick={(event) => seleccionarColumna(event)}>
              País
            </th>
            <th columna="telefono" onClick={(event) => seleccionarColumna(event)}>
              Teléfono
            </th>
            <th columna="fax" onClick={(event) => seleccionarColumna(event)}>
              Fax
            </th>
          </tr>
        </thead>
        <tbody>
          {listaClientesFiltrado
            .slice(pagina * filasPagina, (pagina + 1) * filasPagina)
            .map((cliente) => (
              <tr key={cliente.idcliente}>
                <td>{cliente.idcliente}</td>
                <td>{cliente.usuario}</td>
                <td>{cliente.empresa}</td>
                <td>{cliente.nombres}</td>
                <td>{cliente.correo}</td>
                <td>{cliente.cargo}</td>
                <td>{cliente.direccion}</td>
                <td>{cliente.ciudad}</td>
                <td>{cliente.region}</td>
                <td>{cliente.pais}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.fax}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
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

    setListaClientesFiltrado(
      [...listaClientesFiltrado].sort((a, b) => {
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

  const buscarTexto = (event) => {
    const textoB = event.target.value;
    setTextoBuscar(textoB);
    const resultado = listaClientes.filter((cliente) =>
      cliente[columnaAnterior].toUpperCase().includes(textoB.toUpperCase())
    );
    setListaClientesFiltrado(resultado);
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

  return (
    <section className="padded">
      <div className="container">
        <h2>Clientes</h2>
        <div className="mb-3">
          <input
            type="text"
            value={textoBuscar}
            onChange={buscarTexto}
            className="form-control"
            placeholder="Nombre de empresa a buscar"
          />
        </div>
        {cargando ? (
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          dibujarTabla()
        )}
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
    </section>
  );
}

export default Clientes;

