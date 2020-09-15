import React from 'react'
import {Link} from 'react-router-dom'
function ShowRestaurante(props) {
    const {restaurant} = props
    return (
        <div className="card z-depth-0 proyect-summary grey lighten-3">
            <div className="card-content grey-text text-darken-3 lista-proyectos row">
                <div className="col s3 m2 l1">
                    <img src={restaurant.info.foto || 'https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/user.png?alt=media'} alt={"IMG"} className="responsive-img circle z-depth-3 imagen-lista" /> <br />
                </div>
                <div className="col s9 m10 l11">
                    <Link to={"/restaurantes/" + restaurant.id}><span className="card-title" title={restaurant.info.nombre}>{restaurant.info.nombre}</span></Link>
                    <p>Categorias: {restaurant.info.cat}{restaurant.info.cat2 && ", " + restaurant.info.cat2}</p>
                </div>
            </div>
        </div>
    )
}

export default ShowRestaurante
