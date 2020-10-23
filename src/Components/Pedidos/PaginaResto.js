import React, { Component } from 'react'
import { db } from '../../Config/fbConfig'
import RestoItem from './RestoItem'
export class PaginaResto extends Component {
    state = {
        pedidos: null,
        e0: null,
        e1: null,
        e2: null,
        e3: null,
    }
    componentDidMount = () => {
        this.leerDB()
    }
    leerDB = () => {
        console.log("LEER DB! (PAGINARESTO.JS)");
        db.collection('pedidos').where('restaurante', '==', this.props.auth.uid).orderBy('horario_de_pedido', 'desc').get()
            .then((resp) => {
                const Pedidos = []
                resp.forEach(doc => {
                    const info = doc.data()
                    const id = doc.id;
                    Pedidos.push({ info, id })
                })
                const estado0 = Pedidos.filter(pedido => pedido.info.estado === 0)
                const estado1 = Pedidos.filter(pedido => pedido.info.estado === 1)
                const estado2 = Pedidos.filter(pedido => pedido.info.estado === 2)
                const estado3 = Pedidos.filter(pedido => pedido.info.estado === 3)
                this.setState({ pedidos: Pedidos, e0: estado0, e1: estado1, e2: estado2, e3: estado3 })
            }).catch(error => console.log(error))
    }
    render() {
        // console.log("STATE: ", this.state);
        const { profile } = this.props
        return (
            <div className="row">
                <h4 className="center">Pedidos de {profile.nombre}:
                <button onClick={() => this.leerDB()} className="btn btn-flat black-text waves-effect waves-light">
                        <i className="material-icons">refresh</i>
                    </button></h4>

                <div className="col s12 m6 xl3 pedidos-col-1">
                    <b><p>pedidos por confirmar</p></b>
                    {/* <ul className="collapsible" > */}
                    {this.state.e0 && this.state.e0.map(p => {
                        return (
                            <ul className="collapsible" key={p.id}>
                                <RestoItem p={p} key={p.id} onChangeEstado={this.leerDB}/>
                            </ul>
                        )
                    })}
                    {/* </ul> */}

                </div>
                <div className="col s12 m6 xl3 pedidos-col-2">
                    <b><p>pedidos confirmados, a cocinarlos!</p></b>
                    {this.state.e1 && this.state.e1.map(p => {
                        return (
                            <ul className="collapsible" key={p.id}>
                                <RestoItem p={p} onChangeEstado={this.leerDB} />
                            </ul>
                        )
                    })}
                </div>
                <div className="col s12 m6 xl3 pedidos-col-3">
                    <b> <p>pedidos en preparacion!</p></b>
                    {this.state.e2 && this.state.e2.map(p => {
                        return (
                            <ul className="collapsible" key={p.id}>
                                <RestoItem p={p} onChangeEstado={this.leerDB} />
                            </ul>
                        )
                    })}
                </div>
                <div className="col s12 m6 xl3 pedidos-col-4">
                    <b> <p>pedidos listos para retirar!</p></b>
                    {this.state.e3 && this.state.e3.map(p => {
                        return (
                            <ul className="collapsible" key={p.id}>
                                <RestoItem p={p} onChangeEstado={this.leerDB} />
                            </ul>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default PaginaResto
