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
    }
    componentDidUpdate =()=>{
        if (this.props.profile !== this.state.profile){
            this.setState({
                profile: this.props.profile
            })
            this.leerDB()
        }
    }
    leerDB = () => {
        // db.collection('pedidos').where('usuario', '==', this.props.auth.uid).orderBy('estado', 'asc').orderBy('horario_de_pedido', 'desc').get()
        db.collection('pedidos').where('usuario', '==', this.props.auth.uid).orderBy('estado', 'asc').get()
            .then((resp) => {
                const Pedidos = []
                resp.forEach(doc => {
                    const info = doc.data()
                    // console.log("INFO: ", info);
                    const id = doc.id;
                    Pedidos.push({ info, id })
                })
                // console.log(Pedidos.length);
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
        // console.log("STATE: ", this.state);
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
                    {this.state.pedidos.activos && this.state.pedidos.activos.length !== 0 && this.state.pedidos.activos.map((pedido) => {
                        return (
                            <UsuarioItem activo={true} pedido={pedido} key={pedido.id} />
                        )
                    })}
                    {this.state.pedidos.activos !== null && this.state.pedidos.activos.length === 0 && this.state.cargado && <div className="center">
                        <PestanaVacia activos={true} />
                    </div>}
                </div>
                <div id="historial" className="col s12">
                    <h3><b>Pedidos finalizados</b></h3>
                    <br/>
                    {this.state.pedidos.pasados && this.state.pedidos.pasados.map((pedido) => {
                        return (
                            <UsuarioItem historial={true} pedido={pedido} key={pedido.id} />

                        )
                    })}
                    {this.state.pedidos.pasados.length === 0 && this.state.cargado && <div className="center">
                        <PestanaVacia historial={true} />

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