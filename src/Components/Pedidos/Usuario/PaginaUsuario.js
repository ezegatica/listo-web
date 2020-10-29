import React, { Component } from 'react'
import { db } from '../../../Config/fbConfig'
import M from 'materialize-css'
import PestanaVacia from './PestanaVacia'
import UsuarioItem from './UsuarioItem'
export class PaginaUsuario extends Component {
    state = {
        pedidos: {
            activos: [],
            pasados: [],
            todos: [],
            vacio: false,
        },
        cargado: false,
        profile: this.props.profile
    }
    componentDidMount = () => {
        this.leerDB()
        var el = document.querySelectorAll('.tabs');
        M.Tabs.init(el, {
            // swipeable: true
        });
        var elems2 = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems2, {

        });
    }
    componentDidUpdate = () => {
        if (this.props.profile !== this.state.profile) {
            this.setState({
                profile: this.props.profile
            })
            this.leerDB()
        }
    }
    leerDB = () => {
        // db.collection('pedidos').where('usuario', '==', this.props.auth.uid).orderBy('estado', 'asc').orderBy('horario_entregado', 'desc').orderBy('horario_de_pedido', 'desc').get()
        db.collection('pedidos').where('usuario', '==', this.props.auth.uid).orderBy('estado', 'asc').orderBy('horario_de_pedido', 'desc').get()
            .then((resp) => {
                const Pedidos = []
                resp.forEach(doc => {
                    const info = doc.data()
                    const id = doc.id;
                    Pedidos.push({ info, id })
                })
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
    hola =()=>{
        console.log("hola!");
    }
    render() {
        return (
            <div className="row container pedidos-usuario-container">
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s3"><a href="#activo" className="active">Pedidos activos</a></li>
                        <li className="tab col s3"><a href="#historial">Historial de pedidos</a></li>
                    </ul>
                </div>
                <div id="activo" className="col s12 active">
                    <h3><b>Pedidos activos ({this.state.pedidos.activos.length})</b></h3>
                    {this.state.pedidos.activos.length !== 0 && <br />}
                    <ul className="collapsible popout" >
                        {this.state.pedidos.activos && this.state.pedidos.activos.length !== 0 && this.state.pedidos.activos.map((pedido) => {
                            return (
                                <UsuarioItem activo={true} pedido={pedido} key={pedido.id} leerDB={()=>this.leerDB()} />
                            )
                        })}
                    </ul>
                    {this.state.pedidos.activos !== null && this.state.pedidos.activos.length === 0 && this.state.cargado && <div className="center">
                        <PestanaVacia activos={true} />
                    </div>}
                </div>
                <div id="historial" className="col s12">
                    <h3><b>Pedidos recientes ({this.state.pedidos.pasados.length})</b></h3>
                    {this.state.pedidos.pasados.length !== 0 && <br />}
                    <ul className="collapsible popout" >
                        {this.state.pedidos.pasados && this.state.pedidos.pasados.map((pedido) => {
                            return (
                                <UsuarioItem historial={true} pedido={pedido} key={pedido.id} leerDB={()=>this.leerDB()} />
                            )
                        })}
                    </ul>
                    {this.state.pedidos.pasados.length === 0 && this.state.cargado && <div className="center">
                        <PestanaVacia historial={true} />

                    </div>}
                </div>
            </div>
        )
    }
}

export default PaginaUsuario