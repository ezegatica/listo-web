import React from 'react'
import {Link} from 'react-router-dom'

function E404Producto() {
    return (
        <div className="container center">
                    <h3>Error 404</h3>
                    <h5>El producto no ha sido encontrado, puede haber sido movido o eliminado</h5>
                    <Link to="/"><h6>Volver a la home</h6></Link>
                    <Link to="/restaurantes"><h6>Volver a los restaurantes</h6></Link>
                </div>
    )
}

export default E404Producto
