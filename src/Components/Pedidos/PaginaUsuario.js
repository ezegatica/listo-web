import React, { Component } from 'react'
import { db } from '../../Config/fbConfig'

export class PaginaUsuario extends Component {
    state = {
        pedidos: null
    }
    componentDidMount = () => {
        this.leerDB()
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
    leerDB = () => {
        db.collection('pedidos').where('usuario', '==', this.props.auth.uid).get()
            .then((resp) => {
                const Pedidos = []
                resp.forEach(doc => {
                    const info = doc.data()
                    // console.log("INFO: ", info);
                    const id = doc.id;
                    Pedidos.push({ info, id })
                })
                this.setState({
                    pedidos: Pedidos,
                })
            }).catch(error => console.log(error))
    }
    render() {
        console.log("STATE: ", this.state);
        if (this.state.pedidos) {
            return (
                <div>
                    {this.state.pedidos && this.state.pedidos.map((pedido) => {
                        const s = pedido.info.estado
                        let estado = this.estado(s)
                        return (
                            <div key={pedido.id}>
                                <p>Pedido de {pedido.info.cantidad_de_productos} productos por un valor de ${pedido.info.precio}</p>
                                <p><b>Estado: </b>{estado}</p>
                                <hr />
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div>cargando pedios...</div>
            )
        }
    }
}

export default PaginaUsuario
