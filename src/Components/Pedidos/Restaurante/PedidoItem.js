import React, { Component } from 'react'
export class PedidoItem extends Component {
    state = {
        info: this.props
    }
    estado = (s) => {
        let estado = ''
        switch (s) {
            case 0:
                estado = 'Pendiente de confirmacion'
                break;
            case 1:
                estado = 'Confirmado'
                break;
            case 2:
                estado = 'En preparación'
                break;
            case 3:
                estado = 'Listo para retirar'
                break;
            // case 4:
            //     estado = 'Entregado, esperando confirmacion de usuario'
            //     break;
            case 5:
                estado = 'Entregado.'
                break;
            default:
                estado = 'Error'
                break;
        }
        return estado
    }

    render() {
        const { pedido } = this.state.info
        const s = pedido.info.estado
        let estado = this.estado(s)
        return (
            <>
                <p>Pedido de {pedido.info.cantidad_de_productos} productos por un valor de ${pedido.info.precio}</p>
                <p><b>Estado: </b>{estado}</p>
                <hr />
            </>
        )
    }
}

export default PedidoItem