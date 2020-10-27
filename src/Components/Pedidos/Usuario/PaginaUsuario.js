import React, { Component } from 'react'
import { db } from '../../../Config/fbConfig'
import M from 'materialize-css'
import { Link } from 'react-router-dom'
export class PaginaUsuario extends Component {
    state = {
        pedidos: {
            activos: [],
            pasados: [],
            todos: [],
            vacio: false,
            cargado: false
        }
    }
    componentDidMount = () => {
        this.leerDB()
        var el = document.querySelectorAll('.tabs');
        M.Tabs.init(el, {
            // swipeable: true
        });
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
            case 4:
                estado = 'Entregado.'
                break;
            default:
                estado = 'Error'
                break;
        }
        return estado
    }
    leerDB = () => {
        db.collection('pedidos').where('usuario', '==', this.props.auth.uid).orderBy('estado', 'asc').get()
            .then((resp) => {
                const Pedidos = []
                resp.forEach(doc => {
                    const info = doc.data()
                    // console.log("INFO: ", info);
                    const id = doc.id;
                    Pedidos.push({ info, id })
                })
                console.log(Pedidos.length);
                let Vacio = false
                if (Pedidos.length === 0) {
                    Vacio = true
                }
                this.setState({
                    pedidos: {
                        todos: Pedidos,
                        activos: Pedidos.filter(pedido => pedido.info.estado < 4),
                        pasados: Pedidos.filter(pedido => pedido.info.estado >= 4),
                        vacio: Vacio,
                    },
                    cargado: true
                })
            }).catch(error => console.log(error))
    }
    render() {
        console.log("STATE: ", this.state);
        // if (this.state.pedidos) {
        return (
            <div className="row container pedidos-usuario-container">
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s3"><a href="#activo" className="active">Pedidos activos</a></li>
                        <li className="tab col s3"><a href="#historial">Historial de pedidos</a></li>
                    </ul>
                </div>
                <div id="activo" className="col s12 active">
                    {this.state.pedidos.activos && this.state.pedidos.activos.map((pedido) => {
                        const s = pedido.info.estado
                        let estado = this.estado(s)
                        return (
                            <div key={pedido.id}>
                                <p>Pedido de {pedido.info.cantidad_de_productos} productos por un valor de ${pedido.info.precio}</p>
                                <p><b>Estado: </b>{estado}</p>
                                <p><b>ID: </b>{pedido.id}</p>
                                <hr />
                            </div>
                        )
                    })}
                    {this.state.pedidos.activos !== null && this.state.pedidos.activos.length === 0 && this.state.cargado && <div className="center">
                        <h3>No tienes pedidos activos!</h3>
                        <p>Puedes pedir comida y volver acá cuando los haya!</p>
                        <Link to="/restaurantes">
                            <span className="btn" style={{ borderRadius: '20px', background: '#007AFF' }}>¡Comprar productos!</span>
                        </Link>
                    </div>}
                </div>
                <div id="historial" className="col s12">
                    {this.state.pedidos.pasados && this.state.pedidos.pasados.map((pedido) => {
                        const s = pedido.info.estado
                        let estado = this.estado(s)
                        return (
                            <div key={pedido.id}>
                                <p>Pedido de {pedido.info.cantidad_de_productos} productos por un valor de ${pedido.info.precio}</p>
                                <p><b>Estado: </b>{estado}</p>
                                <p><b>ID: </b>{pedido.id}</p>
                                <hr />
                            </div>
                        )
                    })}
                    {this.state.pedidos.pasados.length === 0 && this.state.cargado && <div className="center">
                        <h3>Nunca pediste algo :(</h3>
                        <p>Termina tu primer pedido y vuelve aqui para verlo</p>
                        <Link to="/restaurantes">
                            <span className="btn" style={{ borderRadius: '20px', background: '#007AFF' }}>¡Haz tu primer pedido!</span>
                        </Link>
                    </div>}
                </div>
            </div>
        )
        // } else {
        //     return (
        //         <div className="container">cargando pedios...</div>
        //     )
        // }
    }
}

export default PaginaUsuario


// {this.state.pedidos.activos && this.state.pedidos.activos.map((pedido) => {
//     const s = pedido.info.estado
//     let estado = this.estado(s)
//     return (
//         <div key={pedido.id}>
//             <p>Pedido de {pedido.info.cantidad_de_productos} productos por un valor de ${pedido.info.precio}</p>
//             <p><b>Estado: </b>{estado}</p>
//             <p><b>ID: </b>{pedido.id}</p>
//             <hr />
//         </div>
//     )
// })}