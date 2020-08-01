import React from 'react'
import {Link} from 'react-router-dom'
const Home = () =>{
    return(
        <div>
            <h1 className="center">Home</h1>
            <Link to="/proyectos/nuevo"><h4 className="center">Nuevo Proyecto?</h4></Link>
        </div>
    )
}

export default Home