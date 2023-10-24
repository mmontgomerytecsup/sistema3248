import { useNavigate } from "react-router-dom";
import { ApiWebURL } from "../utils";

function Login({ onLogin, isAuthenticated}) {

    const navigate = useNavigate()

    const iniciarSesion = async (event) => {
        event.preventDefault();
        const dataForm = new FormData(event.currentTarget);
        //console.log(dataForm.get("usuario"));

        const rutaServicio = ApiWebURL + "iniciarsesion.php";
        let formData = new FormData();
        formData.append("usuario", dataForm.get("usuario"));
        formData.append("clave", dataForm.get("clave"));

        const response = await fetch(rutaServicio, { method: "post", body: formData });
        const result = await response.json();
        switch (result) {
            case -1:
                alert("El usuario no está registrado");
                break;
            case -2:
                alert("La contraseña es incorrecta");
                break;
            default:
                alert("Bienvenido");
                onLogin(result);
                navigate("/escritorio", { replace: true });
                break;
        }
        if (isAuthenticated) {
            navigate("/");
        }
    }
    
    return (
        <section className="padded">
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <h2 className="text-center">Iniciar sesión</h2>
                        <form onSubmit={(event) => iniciarSesion(event)}>
                            <div className="mb-2">
                                <input type="text" className="form-control" required
                                    name="usuario" placeholder="Usuario" />
                            </div>
                            <div className="mb-2">
                                <input type="password" className="form-control" required id="txtClave"
                                    name="clave" placeholder="Contraseña" />
                                <input type="checkbox" className="form-check-input"
                                    onClick={(event) => document.getElementById("txtClave").setAttribute("type",
                                        event.target.checked ? "text" : "password")} />
                                <label className="form-check-label">&nbsp;Mostrar contraseña</label>
                            </div>
                            <div className="mb-2">
                                <button type="submit" className="btn btn-primary w-100">
                                    Iniciar sesión &gt;
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </section>
    )
}

export default Login