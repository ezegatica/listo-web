import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/home.css'

function CardResto(props) {
    const { resto } = props
    if (props.type === 'skeleton') {
        return (
                <div className="card borde-home card-home sombrita card-skeleton">
                    <div className="card-image borde-home">
                        <div className="skeleton-home responsive-img" />
                    </div>
                </div>
        )
    } else {
        return (
            <Link to={`/restaurantes/${resto.id}`}>
                <div className="card borde-home card-home sombrita">
                    <div className="card-image borde-home">
                        <img src={resto.info.foto} alt="boton restaurantes" className="responsive-img imagen-home borde-home" />
                    </div>
                </div>
            </Link>
        )
    }
}

export default CardResto
