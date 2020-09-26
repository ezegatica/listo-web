import React from 'react'
import verTodo from '../../iconos/ver-todo.png'
import sushi from '../../iconos/sushi.png'
import hamburguesa from '../../iconos/hamburguesa.png'
import pinches from '../../iconos/pinches.png'
import tacos from '../../iconos/taco.png'
import galletitas from '../../iconos/galletita.png'
import { Link } from 'react-router-dom'
function Filtros() {
    return (
        <div className="center container">
            <div className=" filtros-container">
            <Link to="/restaurantes/"><img src={verTodo} alt="Ver toda la lista" title="Volver a la lista completa"/></Link>
            <Link to="/restaurantes/categoria/sushi"><img src={sushi} alt="Sushi" title="Sushi"/></Link>
            <Link to="/restaurantes/categoria/hamburguesas"><img src={hamburguesa} alt="Hamburguesa" title="Hamburguesa"/></Link>
            <Link to="/restaurantes/categoria/pollo"><img src={pinches} alt="Pollo" title="Pollo"/></Link>
            <Link to="/restaurantes/categoria/empanadas"><img src={tacos} alt="Empanadas" title="Empanadas"/></Link>
            <Link to="/restaurantes/categoria/sandwiches"><img src={galletitas} alt="Sandwiches" title="Sandwiches"/></Link>
            </div>
        </div>
    )
}

export default Filtros
