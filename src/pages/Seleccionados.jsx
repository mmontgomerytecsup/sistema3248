import { useEffect, useState } from "react";

function Seleccionados() {
  const [seleccionados, setSeleccionados] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    leerDatosSeleccionados();
  }, []);

  const leerDatosSeleccionados = () => {
    let datosSeleccionados = JSON.parse(sessionStorage.getItem("seleccionados"));
    if (datosSeleccionados !== null) {
      setSeleccionados(datosSeleccionados);
      calcularTotal(datosSeleccionados);
    }
  };

  const calcularTotal = (datosSeleccionados) => {
    let suma = datosSeleccionados.reduce((acumular, fila) => acumular + fila.seleccionados, 0);
    setTotal(suma);
  };

  const dibujarTabla = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {seleccionados.length === 0 ? (
            <tr>
              <td colSpan="3">No hay empleados seleccionados</td>
            </tr>
          ) : (
            seleccionados.map((item) => (
              <tr key={item.id}>
                <td>{item.codigo}</td>
                <td>{item.nombre}</td>
                <td>
                  <img src={item.imagen} alt={item.nombre} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  };

  const vaciarSeleccionados = () => {
    sessionStorage.removeItem("seleccionados");
    setSeleccionados([]);
    setTotal(0);
  };

  return (
    <section className="padded">
      <div className="container">
        <h1>Seleccionados</h1>
        <div className="row">
          <div className="col-md-10">{dibujarTabla()}</div>
          <div className="col-md-2">
            <button className="btn btn-danger" onClick={vaciarSeleccionados}>
              Vaciar selección
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Seleccionados;
