import React from 'react'
import {Link} from 'react-router-dom'
const Home = () =>{
    return(
        <div>
            <div className="red">
            <h1 className="container center">AVISO!</h1>
            <h4 className="center">La base de datos se reinciara el 20-8 para tareas de mantenimiento y actualizacion, se perderan todos los datos y cuentas existentes</h4>
            <br />
            </div>
            <hr />
            <Link to="/productos/nuevo"><h3 className="center">Crear Producto</h3></Link>
            <Link to="/profile"><h3 className="center">Mi perfil :D</h3></Link>
            <Link to="/restaurantes"><h3 className="center">Restaurantes</h3></Link>
            {/* <Link to="/proyectos/nuevo"><h4 className="center">Nuevo Proyecto?</h4></Link>
            <Link to="/proyectos"><h4 className="center">Lista de Proyectos</h4></Link> */}

            <h3>Email: usu@r.io</h3>
            <h3>Contraseña: usuario</h3>
            <h5><a href="https://react.gati.ga">Otros proyectos</a></h5>
        </div>
    )
}

export default Home