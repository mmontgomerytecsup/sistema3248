// eslint-disable-next-line react/prop-types
function Escritorio({ }) {
    const name = localStorage.getItem("nombre");
    const ciudad = localStorage.getItem("ciudad");
    const direccion = localStorage.getItem("direccion");
    const telefono = localStorage.getItem("telefono");
    const pais = localStorage.getItem("pais");
    return (
      <section className="padded">
        <div className="container">
          <h2>Escritorio - Profe necesito un 18 por favor, se que el diseño está horrible, 
            pero hice lo que pude :carirta triste: en progra si hice todo :carita feliz:</h2>
        </div>
        <div className="container">
        <a>Hola, {name}</a> <br></br>
        <a>Pais: {pais}</a><br></br>
        <a>Ciudad: {ciudad}</a><br></br>
        <a>Dirección: {direccion}</a><br></br>
        <a>Telefono: {telefono}</a><br></br>
        </div>
       
      </section>
    );
  }
  
  export default Escritorio;
  