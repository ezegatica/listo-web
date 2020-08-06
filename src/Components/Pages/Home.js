import React from 'react'
import {Link} from 'react-router-dom'
const Home = () =>{
    return(
        <div>
            <Link to="/productos"><h3 className="center">Productos</h3></Link>
            <Link to="/proyectos/nuevo"><h4 className="center">Nuevo Proyecto?</h4></Link>
            <Link to="/proyectos"><h4 className="center">Lista de Proyectos</h4></Link>

            <h3>Email: usu@r.io</h3>
            <h3>Contraseña: usuario</h3>
            <h5><a href="https://react.gati.ga">Otros proyectos</a></h5>
            <Link to="/productos">Productos</Link>
        </div>
    )
}

export default Home