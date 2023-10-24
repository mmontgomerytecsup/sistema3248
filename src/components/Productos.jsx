import { useEffect, useState } from "react";
import './Productos.css';
import noImage from './../assets/images/no-image.svg';
import { Link } from "react-router-dom";

function Productos(props) {
    const [listaProductos, setListaProductos] = useState([]);
    const [itemProducto, setItemProducto] = useState([]);
    useEffect(() => {
        //console.log(props.categoriaProductos);

        // eslint-disable-next-line react/prop-types
        leerServicio(props.categoriaProductos);

        // eslint-disable-next-line react/prop-types
    }, [props.categoriaProductos])


    const leerServicio = (idcategoria) => {
        const rutaServicio = "https://servicios.campus.pe/productos.php?idcategoria=" + idcategoria;
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                setListaProductos(data);
            })
    }

    const dibujarCuadricula = () => {
        return (
            <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2 g-4">
                {listaProductos.map(item =>
                    <div className="col" key={item.idproducto}>
                        <div className="card h-100">
                            <figure className="image-content">

                                <Link to={"/productodetalles/" + item.idproducto}>
                                    <img src={item.imagenchica === null
                                        ? noImage
                                        : "https://servicios.campus.pe/" + item.imagenchica
                                    }
                                        className="card-img-top" alt="..." />
                                </Link>

                                {item.preciorebajado !== "0"
                                    ? <div className='porcentaje-descuento'>
                                        {((1 - item.preciorebajado / item.precio) * 100).toFixed(0)}%</div>
                                    : ""}
                                <div className="vista-rapida"
                                    onClick={() => mostrarDatosVistaRapida(item.idproducto)}
                                    data-bs-toggle="modal" data-bs-target="#vistaRapidaModal">
                                    <i className="bi bi-eye"></i></div>
                            </figure>
                            <div className="card-body">
                                <h5 className="card-title">{item.nombre}</h5>
                                <p className="card-text">S/ {item.preciorebajado === "0"
                                    ? parseFloat(item.precio).toFixed(2)
                                    : parseFloat(item.preciorebajado).toFixed(2)}
                                    <span className="precio-lista">
                                        {item.preciorebajado !== "0"
                                            ? "(S/ " + parseFloat(item.precio).toFixed(2) + ")"
                                            : ""}
                                    </span>
                                    <i className="bi bi-basket-fill btnCarrito" title="Añadir al carrito"
                                        onClick={() => agregarCarrito(item)}></i>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    const agregarCarrito = (item) => {
        item.cantidad = 1;
        if (item.preciorebajado !== "0") {
            item.precio = item.preciorebajado;
        }
        console.log(item);
        let carrito = [];
        if (sessionStorage.getItem("carritocompras")) {
            carrito = JSON.parse(sessionStorage.getItem("carritocompras"));
            let index = -1;
            for (let i = 0; i < carrito.length; i++) {
                if (item.idproducto === carrito[i].idproducto) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                carrito.push(item);
                sessionStorage.setItem("carritocompras", JSON.stringify(carrito));
            }
            else {
                carrito[index].cantidad++
                sessionStorage.setItem("carritocompras", JSON.stringify(carrito));
            }
        }
        else {
            carrito.push(item);
            sessionStorage.setItem("carritocompras", JSON.stringify(carrito));
        }

    }

    const mostrarDatosVistaRapida = (idproducto) => {
        //console.log(idproducto);
        const rutaServicio = "https://servicios.campus.pe/productos.php?idproducto=" + idproducto;
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                setItemProducto(data[0]);
            })
    }

    const dibujarVistaRapida = () => {
        return (
            <div className="modal fade" id="vistaRapidaModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{itemProducto.nombre}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <img src={itemProducto.imagengrande === null
                                        ? noImage
                                        : "https://servicios.campus.pe/" + itemProducto.imagengrande
                                    }
                                        className="img-fluid" alt="..." />
                                </div>
                                <div className="col-md-6">
                                    <table className="table">
                                        <tbody>
                                            <tr><th>Detalle</th><td>{itemProducto.detalle}</td></tr>
                                            <tr><th>Precio</th><td>S/ {itemProducto.preciorebajado === "0"
                                                ? parseFloat(itemProducto.precio).toFixed(2)
                                                : parseFloat(itemProducto.preciorebajado).toFixed(2)}
                                                <span className="precio-lista">
                                                    {itemProducto.preciorebajado !== "0"
                                                        ? "(S/ " + parseFloat(itemProducto.precio).toFixed(2) + ")"
                                                        : ""}
                                                </span></td></tr>
                                            <tr><th>Categoría</th><td>{itemProducto.categoria}</td></tr>
                                            <tr><th>Proveedor</th><td>{itemProducto.proveedor}</td></tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Añadir al carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {dibujarCuadricula()}
            {dibujarVistaRapida()}
        </>
    )
}

export default Productos