import React from 'react'
import {Link} from 'react-router-dom'
const Home = () =>{
    return(
        <div>
            {/* <div className="green">
            <h1 className="container center">Changelog 20/8</h1>
            <h4 className="center">Base de datos reinciada, ahora en la pestaña "restaurantes" solo aparecen las cuentas verificadas como restaurantes, los usuarios ahora estan en otra categoria.</h4>
            <br />
            </div>
            <hr /> */}
            <Link to="/productos/nuevo"><h3 className="center">Crear Producto (Restaurantes)</h3></Link>
            <Link to="/restaurantes"><h3 className="center">Lista de restaurantes</h3></Link>
            <Link to="/profile"><h3 className="center">Perfil</h3></Link>
            

            <h3>Email: usu@r.io</h3>
            <h3>Contraseña: usuario</h3>
            <h5><a href="https://react.gati.ga">Otros proyectos</a></h5>
        </div>
    )
}

export default Home