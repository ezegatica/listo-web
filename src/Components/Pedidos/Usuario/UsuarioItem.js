import React, { Component } from 'react'
import M from 'materialize-css'
import moment from 'moment'

export class UsuarioItem extends Component {
    componentDidMount = () => {
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {

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
                const tiempo = moment(pedido.info.horario_entregado.toDate()).calendar()
                const tiempoUppercase = tiempo[0].toUpperCase() + tiempo.slice(1, tiempo.length)
                // ITEMS HISTORIAL DE PEDIDOS
                return (
                    <div className="pedidos-usuario-card">
                        <div className="row">
                            <div className="col s12 m10 offset-m1 l8 offset-l2">
                                <div className="card-panel grey lighten-5 z-depth-1">
                                    <div className="row valign-wrapper">
                                        <div className="col s3 m2 ">
                                            <img src={`https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/imagenes%2F${pedido.info.restaurante}?alt=media`} alt="" className="circle responsive-img" />
                                        </div>
                                        <div className="col s8 m9">
                                            <span className="black-text">
                                            <h5><b>{pedido.info.nombre_restaurante}</b></h5><br/>
                                            {tiempoUppercase}
                                            </span>
                                        </div>
                                        <div className="col s1 m1">
                                            <span style={{float: "right"}}>v</span>
                                        </div>
                                    </div>
                                    <div className="card-action">
                                        <a className="waves-effect waves-light btn modal-trigger" href={`#modal-${pedido.id}`}>Detalles</a>
                                        {/* <button data-target={`modal-${pedido.id}`} className="btn modal-trigger">Modal</button>
                                        <a href="#">This is a link</a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* MODAL CONTENT */}
                        <div id={`modal-${pedido.id}`} className="modal bottom-sheet">
                            <div className="modal-content">
                                <h4>Hola {pedido.id}</h4>
                                <p>A bunch of text</p>
                                <p>Pedido de {pedido.info.cantidad_de_productos} productos por un valor de ${pedido.info.precio}</p>
                                <p><b>Estado: </b>{estado}</p>
                                <p><b>ID: </b>{pedido.id}</p>
                            </div>
                            <div className="modal-footer">
                                <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                            </div>
                        </div>
                    </div>
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
