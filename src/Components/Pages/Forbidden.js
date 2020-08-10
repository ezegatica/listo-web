import React from 'react'
import {Link} from 'react-router-dom'
function Forbidden() {
    return (
        <div className="container center"> 
                <br/>
                <h3>No estas autorizado a editar esta pagina</h3>
                <Link to="/"><h4>Volver al menu principal</h4></Link>
                <Link to="/restaurantes"><h4>Volver a la lista de restaurantes</h4></Link>
        </div>
    )
}

export default Forbidden
