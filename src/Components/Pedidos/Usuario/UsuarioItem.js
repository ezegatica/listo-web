import React, { Component } from 'react'
import M from 'materialize-css'
import moment from 'moment'
import '../../../css/pedidos.css'
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
    render() {
        const { pedido } = this.props
        const s = pedido.info.estado
        let estado = this.estado(s)
        if (this.props.activo) {
            let i = 0;
            // const tiempo = moment(pedido.info.horario_entregado.toDate()).calendar()
            // const tiempoUppercase = tiempo[0].toUpperCase() + tiempo.slice(1, tiempo.length)

            // const dia = moment(pedido.info.horario_de_pedido.toDate()).format('L');
            const icono = this.state.collapsed ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
            // const metodo_de_pago = this.metodo_de_pago(pedido.info.metodo_de_pago)
            // ITEMS PEDIDOS ACTIVOS
            return (
                <li>
                    <div className="collapsible-header valign-wrapper collapsible-header-historial" onClick={() => { this.changeIcon() }}>
                        <div className="col s3 m2 l1 img-pedido-historial-nopadding">
                            <img src={`https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/imagenes%2F${pedido.info.restaurante}?alt=media`} alt="" className="circle responsive-img" />
                        </div>
                        <div className="col s8 m9 l10">
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
                            <a className="waves-effect waves-light btn modal-trigger center " style={{ borderRadius: '20px', background: '#cc312d' }} href={`#modal-cancelar-${pedido.id}`}>Cancelar pedido</a>
                        </span>
                    </div>
                    {/* MODAL DONDE QUEDA */}
                    <div id={`modal-ubicacion-${pedido.id}-2`} className="modal">
                        <div className="modal-content">
                            <h4>Donde queda?</h4>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, tempore omnis soluta dolorem doloribus cumque earum, iure, quibusdam fuga ea id blanditiis eveniet magnam! Obcaecati ipsa quibusdam nisi excepturi consequatur!</p>
                        </div>
                        <div className="modal-footer">
                            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                        </div>
                    </div>
                    <div id={`modal-ubicacion-${pedido.id}`} class="modal modal-fixed-footer">
                        <div class="modal-content">
                            <h4>Modal Header</h4>
                            <p>A bunch of text</p>
                        </div>
                        <div class="modal-footer">
                            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                        </div>
                    </div>
                    {/* MODAL CANCELAR */}
                    <div id={`modal-cancelar-${pedido.id}`} className="modal">
                        <div className="modal-content">
                            <h4>Cancelar</h4>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis repellendus labore quibusdam perspiciatis ea? Quam aliquid ex expedita amet, et ut dicta, nisi provident reiciendis explicabo qui voluptate molestias ad!</p>
                        </div>
                        <div className="modal-footer">
                            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
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
