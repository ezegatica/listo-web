import React, { Component } from 'react'

export class CollapsibleBody extends Component {
    componentDidMount = () => {
        console.log("PROPS:", this.props.estado);
    }
    metodo_de_pago = (m) => {
        let mdp = ''
        switch (m) {
            case '01':
                mdp = 'Efectivo'
                break;
            default:
                mdp = 'Error'
                break;
        }
        return mdp
    }
    render() {
        const estado = this.props.estado
        const { p } = this.props
        const metodo_de_pago = this.metodo_de_pago(p.info.metodo_de_pago)

        let i = 0;
        if (estado === 0) {
            return (
                <div className="collapsible-body card-collapsible-pedido" >
                    <span>
                        <div className="card-collapsible-pedido-comentario">
                            <p><b>Comentario: </b><i>{p.info.comentario}</i></p>
                            <p><b>Metodo de pago: </b>{metodo_de_pago}</p>
                        </div>
                        {p.info.productos.map(item => {
                            i = i + 1
                            return (
                                <div key={item.producto}>
                                    <p>{item.cantidad}x - {p.info.data[i - 1].titulo}</p>
                                </div>
                            )
                        })}
                        <div className="card-collapsible-pedido-footer">
                            <hr />
                            <p><b>Precio: </b>${p.info.precio}</p>
                            <p><b>Pedido a las:</b> {this.props.tiempo}</p>
                        </div>
                    </span>
                </div>
            )
        }
        if (estado === 3) {
            return (
                <div className="collapsible-body card-collapsible-pedido" >
                    <span>
                        <div className="card-collapsible-pedido-comentario">
                            <p><b>A nombre de: </b>{p.info.nombre}</p>
                            <p><b>Metodo de pago: </b>{metodo_de_pago}</p>
                        </div>
                        {p.info.productos.map(item => {
                            i = i + 1
                            return (
                                <div key={item.producto}>
                                    <p>{item.cantidad}x - {p.info.data[i - 1].titulo}</p>
                                </div>
                            )
                        })}
                        <div className="card-collapsible-pedido-footer">
                            <hr />
                            <p><b>Precio: </b>${p.info.precio}</p>
                            <p><b>Pedido a las:</b> {this.props.tiempo}</p>
                        </div>
                    </span>
                </div>
            )
        }
        if (estado === 1 || estado === 2) {
            return (
                <div className="collapsible-body card-collapsible-pedido" ><span>
                    <div className="card-collapsible-pedido-comentario">
                        <p><b>Comentario: </b><i>{p.info.comentario}</i></p>
                    </div>
                    {p.info.productos.map(item => {
                        i = i + 1
                        return (
                            <div key={item.producto}>
                                <p>{item.cantidad}x - {p.info.data[i - 1].titulo}</p>
                            </div>
                        )
                    })}
                </span></div>
            )
        }
        if (estado === 4) {
            return (
                <div className="collapsible-body card-collapsible-pedido" ><span>
                    <div className="card-collapsible-pedido-comentario">
                        <p><b>A nombre de: </b>{p.info.nombre}</p>
                    </div>
                    {p.info.productos.map(item => {
                        i = i + 1
                        return (
                            <div key={item.producto}>
                                <p>{item.cantidad}x - {p.info.data[i - 1].titulo}</p>
                            </div>
                        )
                    })}
                    <p><b>Pedido a las:</b> {this.props.tiempo}</p>

                </span></div>
            )
        }
        return (
            null
        )
    }
}

export default CollapsibleBody
