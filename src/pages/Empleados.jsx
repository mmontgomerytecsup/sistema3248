import { useEffect, useState } from "react";
import noImage from './../assets/images/no-image.svg';
import { Link } from "react-router-dom";

function Empleados() {
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    const rutaServicio = "https://servicios.campus.pe/empleados.php";
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        setListaEmpleados(data);
      });
  };

  const dibujarCuadricula = () => {
    return (
      <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2 g-4">
        {listaEmpleados.map((item) => (
          <div className="col" key={item.idempleado}>
            <div className="card h-100">
              <figure className="image-content">
                <img
                  src={`https://servicios.campus.pe/fotos/${item.foto}`}
                  className="card-img-top"
                  alt="..."
                />
              </figure>
              <div className="card-body">
                <h5 className="card-title">{item.cargo}</h5>
                <p className="card-text">
                  {item.nombres} {item.apellidos}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => agregarSeleccionado(item)}
                >
                  Agregar a seleccionados
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const agregarSeleccionado = (item) => {
    const seleccionado = { id: item.idempleado, nombre: item.nombres };
    setSeleccionados((prevSeleccionados) => [...prevSeleccionados, seleccionado]);
  };

  return (
    <section className="padded">
      <div className="container">
        {dibujarCuadricula()}
      </div>
    </section>
  );
}

export default Empleados;
