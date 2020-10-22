import React, { Component } from 'react'
import M from 'materialize-css'
import moment from 'moment'
import 'moment/locale/es'
import swal from 'sweetalert'
import { db } from '../../Config/fbConfig'
export class RestoItem extends Component {
    state = {
        collapsed: false
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
    changeIcon = () => {
        switch (this.state.collapsed) {
            case true:
                this.setState({
                    collapsed: false
                })
                break;
            case false:
                this.setState({
                    collapsed: true
                })
                break;
            default:
                swal("error")
                break;
        }
    }
    cambiarEstado = (id, estadoActual) => {
        const estadoNuevo = estadoActual + 1
        // swal(id, `pasar a estado ${estadoNuevo}`);
        db.collection('pedidos').doc(id).update({
            estado: estadoNuevo
        }).then(() => {
            this.props.onChangeEstado(id, estadoNuevo);
        }).catch((err) => {
            swal(
                "Error", `Tu accion no se ha podido procesar, intenta de vuelta o contacta a soporte si el problema persiste \nSi ves a algun programador, decile que: \n"${err.message}"`, "error"
            );
        })
    }
    componentDidMount = () => {
        // console.log("PROPS: ", this.props);
        var options
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems, options);
        var options2
        var elems2 = document.querySelectorAll('.tooltipped');
        var instances2 = M.Tooltip.init(elems2, options2);
        options2 = instances2
        options = instances;
    }
    render() {
        const id = this.props.p.id
        const estado = this.props.p.info.estado
        const icono = this.state.collapsed ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
        // const icono = this.state.collapsed ? null : null
        const volverEstado = this.props.p.info.estado > 0 ? true : false
        let i = 0;
        const { p } = this.props
        const metodo_de_pago = this.metodo_de_pago(p.info.metodo_de_pago)
        const tiempo = moment(p.info.horario_de_pedido.toDate()).locale('es').calendar()

        const Header = () => {
            return (
                <div className="collapsible-header" onClick={() => this.changeIcon()}>
                    {volverEstado && <span className="boton-mover-estado-r left">
                        <button onClick={() => swal("hola")} className="btn btn-flat black-text icon-pedidos tooltipped left" data-position="top" data-tooltip="Mover pedido al estado anterior"><i className="material-icons left">arrow_back</i></button>
                    </span>}
                    <div className="pedidos-header" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        <span className="center" >Pedido {p.id}</span><br/>
                        <i className="material-icons icon-pedidos icon-align">{icono}</i>
                    </div>
                    <span className="boton-mover-estado">
                        <button onClick={() => this.cambiarEstado(id, estado)} className="btn btn-flat black-text icon-pedidos tooltipped" data-position="top" data-tooltip="Mover pedido al siguiente estado"><i className="material-icons right ">arrow_forward</i></button>
                    </span>
                </div>
            )
        }

        if (p.info.estado === 0 || p.info.estado === 3) {
            return (
                <li>
                    <Header />
                    <div className="collapsible-body card-collapsible-pedido" ><span>
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
                            <p><b>Pedido a las:</b> {tiempo}</p>
                        </div>
                    </span></div>
                </li>
            )
        } else {
            return (
                <li>
                    <Header />
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
                </li>
            )
        }

    }
}

export default RestoItem

