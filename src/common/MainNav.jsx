import { Link } from "react-router-dom"
import logo from '../assets/images/logo.png';

function MainNav({ isAuthenticated, onLogout, usuario }) {
    // eslint-disable-next-line react/prop-types
    if (usuario !== null) {
        // eslint-disable-next-line react/prop-types
        console.log(usuario[0].empresa)
        localStorage.setItem("nombre", usuario[0].nombres);
        localStorage.setItem("ciudad", usuario[0].ciudad);
        localStorage.setItem("direccion", usuario[0].direccion);
        localStorage.setItem("telefono", usuario[0].telefono);
        localStorage.setItem("pais", usuario[0].pais);
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top bg-dark navbar-dark">
            <div className="container">
                <Link className="navbar-brand" to="/"> <img src={logo} alt="Logo" width="50" height="50" className="navbar-logo" /> Wild Cat Games</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="#nosotros">Nosotros</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#noticias">Noticias</a>
                        </li>
                        {isAuthenticated ?
                            <li className="nav-item">
                                <Link className="nav-link" to="/inversiones">Inversiones</Link>
                            </li>
                            : <></>}                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/proveedores">Proveedores</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/empleados">Empleados</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/pedidos">Pedidos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/seleccionados">Seleccionados</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tienda">Tienda</Link>
                        </li>      
                        <li className="nav-item">
                            <Link className="nav-link" to="/clientes">Clientes</Link>
                        </li> 
                        {isAuthenticated ?
                            <li className="nav-item">
                                <Link className="nav-link" to="/directores">Directores</Link>
                            </li>
                            : <></>}       
                        <li className="nav-item">
                            <Link className="nav-link" to="/consultas">Consultas Ex Final</Link>
                        </li>           
                        
                        
                        
                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/carrito">
                            <i className="bi bi-basket-fill" title="Carrito de compras"></i> Carrito</Link>
                        </li>
                        {isAuthenticated
                            ? <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Hola {
                                        // eslint-disable-next-line react/prop-types
                                        usuario[0].empresa
                                    }
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#" onClick={onLogout}>Cerrar sesión</a></li>
                                </ul>
                            </li>
                            :
                            // eslint-disable-next-line react/prop-types
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    <i className="bi bi-person-fill" title="Inicio de sesión"></i> Inicio de sesión</Link>
                            </li>
                        }
                    </ul>    
                </div>
            </div>
        </nav>
    )
}

export default MainNav