import React from 'react'
import { Link } from 'react-router-dom'

function e404() {
    return (
        <div>
            <h2 className="center">Pagina no encontrada!</h2>
            <Link to="/"><h4 className="center">Volver a la home</h4></Link>
        </div>
    )
}

export default e404
