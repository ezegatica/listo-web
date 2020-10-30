import React, { Component } from 'react'
import M from 'materialize-css'
import moment from 'moment'
import '../../../css/pedidos.css'
import swal from 'sweetalert'
import { db } from '../../../Config/fbConfig'

export class UsuarioItem extends Component {
    state = {
        collapsed: false
    }
    componentDidMount = () => {
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {

        });
        var elems2 = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems2, {

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
                estado = 'Entregado'
                break;
            case 10:
                estado = 'Cancelado'
                break;
            default:
                estado = 'Error'
                break;
        }
        return estado
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
                break;
        }
    }
    cancelarPedido = () => {
        const { pedido } = this.props
        if (pedido.info.estado === 0) {
            swal('Cancelando pedido!', 'Comunicando con la base de datos...', 'info')
            db.collection('pedidos').doc(pedido.id).update({
                estado: 10,
                horario_entregado: new Date(),
            }).then(() => {
                // AVISAR AL RESTAURANTE QUE SE CANCELO UN PEDIDO
                db.collection('usuarios').doc(pedido.info.restaurante).update({
                    refresh: {
                        tipo: 'avisar_cancelado',
                        titulo: `Un pedido no confirmado se ha cancelado!`,
                        id: this.props.pedido.id,
                        random: Math.random(11, 20),
                        hora: Date.now()
                    }
                }).then(() => {
                    swal({
                        title: 'Pedido cancelado!',
                        content: ' ',
                        icon: 'success',
                        timer: 5000
                    })
                    this.props.leerDB();
                }).catch((err) => {
                    swal(
                        "Error", `Tu accion no se ha podido procesar, intenta de vuelta o contacta a soporte si el problema persiste \nSi ves a algun programador, decile que: \n"${err.message}"`, "error"
                    );
                })
            }).catch((err) => {
                swal(
                    "Error", `Tu accion no se ha podido procesar, intenta de vuelta o contacta a soporte si el problema persiste \nSi ves a algun programador, decile que: \n"${err.message}"`, "error"
                );
            })
        }
    }
    render() {
        let divClass1
        let divClass2
        if (this.props.showPics === false) {
            divClass1 = "hide"
            divClass2 = "col s11 m11 l11"
        } else {
            divClass1 = "col s3 m2 l1 img-pedido-historial-nopadding"
            divClass2 = "col s8 m9 l10"
        }
        const { pedido } = this.props
        const s = pedido.info.estado
        let estado = this.estado(s)
        if (this.props.activo) {
            let i = 0;
            const icono = this.state.collapsed ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
            const metodo_de_pago = this.metodo_de_pago(pedido.info.metodo_de_pago)
            // ITEMS PEDIDOS ACTIVOS
            return (
                <li>
                    <div className="collapsible-header valign-wrapper collapsible-header-historial" onClick={() => { this.changeIcon() }} >
                        <div className={divClass1}>
                            <img src={`https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/imagenes%2F${pedido.info.restaurante}?alt=media`} alt="" className="circle responsive-img" />
                        </div>
                        <div className={divClass2}>
                            <span className="black-text">
                                <h5><b>{pedido.info.nombre_restaurante} - {pedido.info.cantidad_de_productos} productos</b></h5>
                                <p className="texto-card-pedido-activo"><b>Estado: </b>{estado}</p>
                                <p className="texto-card-pedido-activo"><b>Precio: </b>${pedido.info.precio}</p>
                            </span>
                        </div>
                        <div className="s1 m1 l1">
                            <span style={{ float: "right" }}><i className="material-icons" style={{ fontSize: '2rem' }}>{icono}</i></span>
                        </div>
                    </div>
                    <div className="collapsible-body historial-collapsible-body">
                        <span className="centro acciones-pedido">
                            <a className="waves-effect waves-light btn modal-trigger center " style={{ borderRadius: '20px', background: '#007AFF' }} href={`#modal-ubicacion-${pedido.id}`}>¿Donde queda?</a>
                            <a className="waves-effect waves-light btn modal-trigger center " style={{ borderRadius: '20px', background: '#698a34' }} href={`#modal-detalles-${pedido.id}`}>Detalles</a>
                            {pedido.info.estado === 0 && <a className="waves-effect waves-light btn modal-trigger center " style={{ borderRadius: '20px', background: '#cc312d' }} href={`#modal-cancelar-${pedido.id}`}>Cancelar pedido</a>}
                        </span>
                    </div>
                    {/* MODAL DONDE QUEDA */}
                    <div id={`modal-ubicacion-${pedido.id}`} className="modal modal-fixed-footer">
                        <div className="modal-content">
                            <h4><b>¿Donde queda {pedido.info.nombre_restaurante}?</b></h4>
                            <p>aca iria el mapa, SI TAN SOLO TUVIERA UNO</p>
                            <img src="https://memegenerator.net/img/images/15215811/si-tan-solo-tuviera-uno.jpg" alt="por favor ayuda" style={{ height: '75%', width: 'auto' }} />
                        </div>
                        <div className="modal-footer">
                            <a href="#!" className="modal-close waves-effect btn-flat white-text" style={{ borderRadius: '20px', background: '#007AFF' }}>OK</a>
                        </div>
                    </div>
                    {/* MODAL DETALLES*/}
                    <div id={`modal-detalles-${pedido.id}`} className="modal">
                        <div className="modal-content">
                            <h4><b>Pedido a {pedido.info.nombre_restaurante}</b></h4>
                            <p><b>Pagado con: </b>{metodo_de_pago}</p>
                            <p><b>Productos:</b></p>
                            <span>
                                {pedido.info.productos.map(item => {
                                    i = i + 1
                                    return (
                                        <div key={item.producto}>
                                            <p>${pedido.info.data[i - 1].precio} - {item.cantidad}x {pedido.info.data[i - 1].titulo}</p>
                                        </div>
                                    )
                                })}
                            </span>
                            <p><b>Valor total del pedido: </b>${pedido.info.precio}</p>
                            <p><b>Comentario al restaurante: </b>"<i>{pedido.info.comentario}</i>"</p>
                        </div>
                        <div className="modal-footer">
                            <p style={{ float: "left" }}><b>ID: </b>{pedido.id}</p>
                            <a href="#!" className="modal-close waves-effect waves-green btn-flat white-text" style={{ borderRadius: '20px', background: '#698a34' }}>Confirmar</a>
                        </div>
                    </div>
                    {/* MODAL CANCELAR */}
                    <div id={`modal-cancelar-${pedido.id}`} className="modal">
                        <div className="modal-content">
                            <h4><b>Cancelar pedido</b></h4>
                            <p>Solo puedes cancelar tu pedido si todavia no ha sido confirmado por el restaurante. Una vez cancelado, se notificara al restaurante de tu decisión y el pedido aparecerá como "cancelado" en tu perfil.</p>
                        </div>
                        <div className="modal-footer">
                            <a href="#!" className="modal-close waves-effect waves-green btn-flat white-text" style={{ borderRadius: '20px', background: '#cc312d' }} onClick={() => this.cancelarPedido()}>Confirmar</a>
                        </div>
                    </div>
                </li>
            )
        } else {
            if (this.props.historial) {
                let i = 0;
                const tiempo = moment(pedido.info.horario_entregado.toDate()).calendar()
                const tiempoUppercase = tiempo[0].toUpperCase() + tiempo.slice(1, tiempo.length)
                const dia = moment(pedido.info.horario_de_pedido.toDate()).format('L');
                const icono = this.state.collapsed ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                const metodo_de_pago = this.metodo_de_pago(pedido.info.metodo_de_pago)
                const badge = pedido.info.estado === 10 ? <span className="badge red white-text">CANCELADO</span> : <span className="badge green white-text">ENTREGADO</span>
                // ITEMS HISTORIAL DE PEDIDOS
                return (
                    <li>
                        <div className="collapsible-header valign-wrapper collapsible-header-historial" onClick={() => { this.changeIcon() }}>
                            <div className="col s3 m2 l1 img-pedido-historial-nopadding">
                                <img src={`https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/imagenes%2F${pedido.info.restaurante}?alt=media`} alt="" className="circle responsive-img" />
                            </div>
                            <div className="col s8 m9 l10">
                                <span className="black-text">
                                    <h5><b>{pedido.info.nombre_restaurante}</b></h5>
                                    {tiempoUppercase}
                                </span>
                            </div>
                            <div className="s1 m1 l1">
                                <span style={{ float: "right" }}>{badge}</span>
                                <span style={{ float: "right" }}><i className="material-icons" style={{ fontSize: '2rem' }}>{icono}</i></span>
                            </div>
                        </div>
                        <div className="collapsible-body historial-collapsible-body">
                            <span className="centro">
                                <a className="waves-effect waves-light btn modal-trigger center " style={{ borderRadius: '20px', background: '#007AFF' }} href={`#modal-${pedido.id}`}>Detalles</a>
                            </span>
                        </div>
                        {/* MODAL CONTENT */}
                        <div id={`modal-${pedido.id}`} className="modal bottom-sheet">
                            <div className="modal-content">
                                <h4><b>Pedido a {pedido.info.nombre_restaurante} ({dia}) - {estado}</b></h4>
                                <p><b>Pagado con: </b>{metodo_de_pago}</p>
                                <p><b>Productos:</b></p>
                                <span>
                                    {pedido.info.productos.map(item => {
                                        i = i + 1
                                        return (
                                            <div key={item.producto}>
                                                <p>${pedido.info.data[i - 1].precio} - {item.cantidad}x {pedido.info.data[i - 1].titulo}</p>
                                            </div>
                                        )
                                    })}
                                </span>
                                <p><b>Valor total del pedido: </b>${pedido.info.precio}</p>
                                <p><b>Comentario al restaurante: </b>"<i>{pedido.info.comentario}</i>"</p>
                                <p><b>ID del pedido: </b>{pedido.id}</p>
                            </div>
                            <div className="modal-footer">
                                <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                            </div>
                        </div>
                    </li>

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
