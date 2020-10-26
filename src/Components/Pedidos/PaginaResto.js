import React, { Component } from 'react'
import { db } from '../../Config/fbConfig'
import RestoItem from './RestoItem'
import M from 'materialize-css'
export class PaginaResto extends Component {
    state = {
        pedidos: null,
        e0: null,
        e1: null,
        e2: null,
        e3: null,
        e4: null,
        e5: null
    }
    componentDidMount = () => {
        this.leerDB()
        var el = document.querySelectorAll('.tabs');
        M.Tabs.init(el, {

        });
    }
    leerDB = () => {
        db.collection('pedidos').where('restaurante', '==', this.props.auth.uid).orderBy('horario_de_pedido', 'desc').get()
            .then((resp) => {
                let TotalRecaudado = 0;
                const Pedidos = []
                resp.forEach(doc => {
                    const info = doc.data()
                    const precio = parseInt(info.precio, 10)
                    if (info.estado === 4) {
                        TotalRecaudado = TotalRecaudado + precio
                    }
                    const id = doc.id;
                    Pedidos.push({ info, id })
                })
                this.setState({
                    pedidos: Pedidos,
                    e0: Pedidos.filter(pedido => pedido.info.estado === 0),
                    e1: Pedidos.filter(pedido => pedido.info.estado === 1),
                    e2: Pedidos.filter(pedido => pedido.info.estado === 2),
                    e3: Pedidos.filter(pedido => pedido.info.estado === 3),
                    e4: Pedidos.filter(pedido => pedido.info.estado === 4),
                    // e5: Pedidos.filter(pedido => pedido.info.estado === 3),
                    TotalRecaudado: TotalRecaudado,
                })
            }).catch(error => console.log(error))
    }
    render() {
        // console.log("STATE: ", this.state);
        const { profile } = this.props
        return (
            <div className="pedidos-container pedidos">
                <h4 className="center">Pedidos de {profile.nombre}:
                        <button onClick={() => this.leerDB()} className="btn btn-flat black-text waves-effect waves-light">
                        <i className="material-icons">refresh</i>
                    </button></h4>

                <div className="row">
                    <div className="col s12">
                        <ul className="tabs">
                            <li className="tab col s3"><a href="#activos">Activos</a></li>
                            <li className="tab col s3"><a href="#pasados">Completos</a></li>
                        </ul>
                    </div>
                    <div id="activos" className="col s12">
                        <div className="row pedidos-pendientes">

                            <div className="col s12 m6 xl4 pedidos-col-1">
                                <b><p>pedidos por confirmar</p></b>
                                {this.state.e0 && this.state.e0.map(p => {
                                    return (
                                        <ul className="collapsible" key={p.id}>
                                            <RestoItem p={p} key={p.id} onChangeEstado={this.leerDB} />
                                        </ul>
                                    )
                                })}
                            </div>

                            <div className="col s12 m6 xl4 pedidos-col-2">
                                <b><p>pedidos confirmados, a cocinarlos!</p></b>
                                {this.state.e1 && this.state.e1.map(p => {
                                    return (
                                        <ul className="collapsible" key={p.id}>
                                            <RestoItem p={p} onChangeEstado={this.leerDB} />
                                        </ul>
                                    )
                                })}
                            </div>

                            <div className="col s12 m6 xl4 pedidos-col-3">
                                <b> <p>pedidos en preparacion!</p></b>
                                {this.state.e2 && this.state.e2.map(p => {
                                    return (
                                        <ul className="collapsible" key={p.id}>
                                            <RestoItem p={p} onChangeEstado={this.leerDB} />
                                        </ul>
                                    )
                                })}
                            </div>

                        </div>
                    </div>
                    <div id="pasados" className="col s12">
                        <div className="row pedidos-completados">

                            <div className="col s12 m6 xl4">
                                <b> <p>pedidos listos para retirar!</p></b>
                                {this.state.e3 && this.state.e3.map(p => {
                                    return (
                                        <ul className="collapsible" key={p.id}>
                                            <RestoItem p={p} onChangeEstado={this.leerDB} />
                                        </ul>
                                    )
                                })}
                            </div>
                            <div className="col s12 m6 xl4 offset-xl4">
                                <p><b>Pedidos entregados: </b>{this.state.e4 && this.state.e4.length.toString()}</p>
                                <p><b>Dinero recaudado: </b>${this.state.TotalRecaudado}</p>
                                {/* {this.state.e5 && this.state.e5.map(p => {
                            return (
                                <ul className="collapsible" key={p.id}>
                                    <RestoItem p={p} onChangeEstado={this.leerDB} />
                                </ul>
                            )
                        })} */}

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default PaginaResto
