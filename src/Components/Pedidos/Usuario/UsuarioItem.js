import React, { Component } from 'react'

export class UsuarioItem extends Component {
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
            case 4:
                estado = 'Entregado.'
                break;
            default:
                estado = 'Error'
                break;
        }
        return estado
    }
    render() {
        const { pedido } = this.props
        const s = pedido.info.estado
        let estado = this.estado(s)
        if (this.props.activo) {
            return (
                <>
                    <p>Pedido de {pedido.info.cantidad_de_productos} productos por un valor de ${pedido.info.precio}</p>
                    <p><b>Estado: </b>{estado}</p>
                    <p><b>ID: </b>{pedido.id}</p>
                    <p>pog</p>
                    <hr />
                </>
            )
        } else {
            if (this.props.historial) {
                return (
                    <>
                        <p>Pedido de {pedido.info.cantidad_de_productos} productos por un valor de ${pedido.info.precio}</p>
                        <p><b>Estado: </b>{estado}</p>
                        <p><b>ID: </b>{pedido.id}</p>
                        <p>pog</p>
                        <hr />
                    </>
                )
            } else {
                return (
                    <div>error</div>
                )
            }
        }

    }
}

export default UsuarioItem
