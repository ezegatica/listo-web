import React from 'react'
import sushi from '../../iconos/sushi.png'
import hamburguesa from '../../iconos/hamburguesa.png'
import pinches from '../../iconos/pinches.png'
// import { Link } from 'react-router-dom'
function Filtros() {
    return (
        <div className="center container filtros-container">
            <a href="/restaurantes/categoria/sushi"><img src={sushi} alt="Sushi" title="Sushi"/></a>
            <a href="/restaurantes/categoria/hamburguesas"><img src={hamburguesa} alt="Hamburguesa" title="Hamburguesa"/></a>
            <a href="/restaurantes/categoria/pollo"><img src={pinches} alt="Pollo" title="Pollo"/></a>
            
        </div>
    )
}

export default Filtros
