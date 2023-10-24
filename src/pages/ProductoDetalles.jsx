import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import noImage from './../assets/images/no-image.svg';

function ProductoDetalles() {
    const [itemProducto, setItemProducto] = useState([]);
    let params = useParams();
    //console.log(params);
    useEffect(() => {
        leerServicio();
    }, [])

    const leerServicio = () => {
        //console.log(idproducto);
        const rutaServicio = "https://servicios.campus.pe/productos.php?idproducto=" + params.idproducto;
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setItemProducto(data[0]);
            })
    }

    return (
        <section className="padded">
            <div className="container">
                <h1>{itemProducto.nombre}</h1>
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
                                <tr><th>Stock</th><td>{itemProducto.unidadesenexistencia}</td></tr>
                                <tr><th>Categoría</th><td>{itemProducto.categoria}</td></tr>
                                <tr><th>Proveedor</th><td>{itemProducto.proveedor}</td></tr>

                                <tr><th>País</th><td>{itemProducto.pais}</td></tr>
                                <tr><th>Atención al cliente</th><td>{itemProducto.telefono}</td></tr>
                            </tbody>
                        </table>
                        <h3>Descripción</h3>
                        <div dangerouslySetInnerHTML={{__html: itemProducto.descripcion}}></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductoDetalles