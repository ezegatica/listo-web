import React, { Component } from 'react'

export class RestoItem extends Component {
    render() {
        const { p } = this.props
        return (
            <div className="pedido-card">
                <p>Pedido de {p.info.cantidad_de_productos} productos por un valor de ${p.info.precio}</p>
            </div>
        )
    }
}

export default RestoItem
