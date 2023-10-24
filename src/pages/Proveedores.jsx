/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react"
import { ApiWebURL } from "../utils";

function Proveedores() {
    const [listaProveedores, setListaProveedores] = useState([]);
    const [listaProveedoresFiltrado, setListaProveedoresFiltrado] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [ascendente, setAscendente] = useState(1);
    const [columnaAnterior, setColumnaAnterior] = useState("nombreempresa");
    const [textoBuscar, setTextoBuscar] = useState("");
    const [pagina, setPagina] = useState(0);
    const [filasPagina] = useState(5);
    const [numPaginas, setNumPaginas] = useState(0);

    useEffect(() => {
        leerServicio();
    }, [])

    const leerServicio = async () => {
        const rutaServicio = ApiWebURL + "proveedores.php";
        const response = await fetch(rutaServicio);
        const data = await response.json();
        setListaProveedores(data);
        setListaProveedoresFiltrado(data);
        setCargando(false);
        setNumPaginas(Math.ceil(data.length / filasPagina));
        /*
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setListaProveedores(data);
                setCargando(false);
            })
        */
    }

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th columna="idproveedor" onClick={(event) => seleccionarColumna(event)}>Código</th>
                        <th columna="nombreempresa" onClick={(event) => seleccionarColumna(event)}>Empresa</th>
                        <th columna="nombrecontacto" onClick={(event) => seleccionarColumna(event)}>Contacto</th>
                        <th columna="cargocontacto" onClick={(event) => seleccionarColumna(event)}>Cargo</th>
                        <th columna="ciudad" onClick={(event) => seleccionarColumna(event)}>Ciudad</th>
                    </tr>
                </thead>
                <tbody>
                    {listaProveedoresFiltrado.slice(pagina*filasPagina, (pagina + 1)*filasPagina).map(item =>
                        <tr key={item.idproveedor}>
                            <td>{item.idproveedor}</td>
                            <td>{item.nombreempresa}</td>
                            <td>{item.nombrecontacto}</td>
                            <td>{item.cargocontacto}</td>
                            <td>{item.ciudad}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    const seleccionarColumna = (event) => {
        let columnaSeleccionada = event.target.getAttribute("columna");
        let ascendentex = ascendente 
        if(columnaAnterior == columnaSeleccionada){
            ascendentex = -ascendentex
        }
        else{
            ascendentex = 1
        }
        setAscendente(ascendentex);
        setColumnaAnterior(columnaSeleccionada);
        
        setListaProveedoresFiltrado([...listaProveedoresFiltrado].sort((a, b) => {
            console.log(ascendente)
            const codigoMenor = "return a." + columnaSeleccionada + " < b." + columnaSeleccionada + "? true : false";
            const funcionMenor = new Function('a', 'b', codigoMenor);
            if (funcionMenor(a, b)) {
                return -ascendentex;
            }
            const codigoMayor = "return a." + columnaSeleccionada + " > b." + columnaSeleccionada + "? true : false";
            const funcionMayor = new Function('a', 'b', codigoMayor);
            if (funcionMayor(a, b)) {
                return ascendentex;
            }
            return 0;
            /*
            if(eval("a." + columnaSeleccionada + " < b." + columnaSeleccionada)){
                return -1;
            }
            if(eval("a." + columnaSeleccionada + " > b." + columnaSeleccionada)){
                return 1;
            }
            return 0;
            */
        }))
    }

    const dibujarPrecarga = () => {
        return (
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        )
    }

    const buscarTexto = (event) => {
        let textoB = event.target.value
        setTextoBuscar(textoB);
        const resultado = listaProveedores.filter((item) => 
            (item[columnaAnterior].toUpperCase()).includes(textoB.toUpperCase()));
        setListaProveedoresFiltrado(resultado);

    }

    const avanzar = () => {
        if(pagina<numPaginas-1){
            setPagina(pagina + 1);
        }
    }
    const retroceder = () => {
        if(pagina>0){
            setPagina(pagina - 1);
        }
    }

    return (
        <section className="padded">
            <div className="container">
                <h2>Proveedores</h2>
                <div className="mb-3">
                    <input type="text" value={textoBuscar} onChange={(event) => buscarTexto(event)}
                        className="form-control" placeholder="Indique expresión a buscar"/>
                </div>
                {cargando
                    ? dibujarPrecarga()
                    : dibujarTabla()}
                    <div> {(pagina + 1) + " de " + numPaginas}</div>
                    <button className="btn btn-primary" onClick={() => retroceder()}>Retroceder</button>
                    <button className="btn btn-primary" onClick={() => avanzar()}>Avanzar</button>
            </div>
        </section>
    )
}

export default Proveedores