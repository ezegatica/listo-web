import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class PestanaVacia extends Component {
    render() {
        if (this.props.activos === true) {
            return (
                <>
                    <h3>No tienes pedidos activos!</h3>
                    <p>Puedes pedir comida y volver acá cuando los haya!</p>
                    <Link to="/restaurantes">
                        <span className="btn" style={{ borderRadius: '20px', background: '#007AFF' }}>¡Comprar productos!</span>
                    </Link>
                </>
            )
        }else{
            if (this.props.historial === true){
                return(
                    <>
                    <h3>Nunca pediste algo :(</h3>
                        <p>Termina tu primer pedido y vuelve aqui para verlo</p>
                        <Link to="/restaurantes">
                            <span className="btn" style={{ borderRadius: '20px', background: '#007AFF' }}>¡Haz tu primer pedido!</span>
                        </Link>
                    </>
                )
            }else{
                return (
                    <div>
                            ERROR
                    </div>
                )
            }
        }
        
    }
}

export default PestanaVacia
