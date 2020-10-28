import React, { Component } from 'react'
import M from 'materialize-css'
import moment from 'moment'

export class UsuarioItem extends Component {
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
    render() {
        const { pedido } = this.props
        const s = pedido.info.estado
        let estado = this.estado(s)
        if (this.props.activo) {
            // ITEMS PEDIDOS ACTIVOS
            return (
                <>
                    <p>Pedido de {pedido.info.cantidad_de_productos} productos por un valor de ${pedido.info.precio}</p>
                    <p><b>Estado: </b>{estado}</p>
                    <p><b>ID: </b>{pedido.id}</p>
                    <hr />
                </>
            )
        } else {
            if (this.props.historial) {
                let i = 0;
                const tiempo = moment(pedido.info.horario_entregado.toDate()).calendar()
                const tiempoUppercase = tiempo[0].toUpperCase() + tiempo.slice(1, tiempo.length)
                const dia = moment(pedido.info.horario_de_pedido.toDate()).format('L'); 
                const metodo_de_pago = this.metodo_de_pago(pedido.info.metodo_de_pago)
                // ITEMS HISTORIAL DE PEDIDOS
                return (
                    <li>
                        <div className="collapsible-header valign-wrapper collapsible-header-historial">
                            <div className="col s3 m2 l1 img-pedido-historial-nopadding">
                                <img src={`https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/imagenes%2F${pedido.info.restaurante}?alt=media`} alt="" className="circle responsive-img" />
                            </div>
                            <div className="col s9 m10 l11">
                                <span className="black-text">
                                    <h5><b>{pedido.info.nombre_restaurante}</b></h5>
                                    {tiempoUppercase}
                                </span>
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
