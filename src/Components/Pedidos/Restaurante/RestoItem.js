import React, { Component } from 'react'
import M from 'materialize-css'
import moment from 'moment'
import 'moment/locale/es'
import swal from 'sweetalert'
import { db } from '../../../Config/fbConfig'
import CollapsibleBody from '../CollapsibleBody'
export class RestoItem extends Component {
    state = {
        collapsed: false,
        mostrarBody: true
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
    cambiarEstado = (id, estadoActual, accion) => {
        this.setState({ mostrarBody: false })
        let estadoNuevo
        if (accion) {
            estadoNuevo = estadoActual + 1
        }
        else {
            estadoNuevo = estadoActual - 1
        }
        if (estadoNuevo === 1 && accion) {
            swal("Atencion!", "Una vez que confirmes el pedido, no se va a poder volver atrás", "warning", {
                buttons: {
                    cancel: "Cancelar",
                    confirm: true,
                },
                dangerMode: true,
            })
                .then((value) => {
                    switch (value) {
                        case true:
                            swal.close()
                            this.sendDB(id, estadoNuevo)
                            break;
                        default:
                            this.setState({ mostrarBody: true })
                            swal.close()
                    }
                });
        } else {
            if (estadoNuevo === 4 && accion){
                swal("Atencion!", 'Una vez que marques el pedido como "entregado" no vas a poder volver atras ', "warning", {
                    buttons: {
                        cancel: "Cancelar",
                        confirm: true,
                    },
                    dangerMode: true,
                })
                    .then((value) => {
                        switch (value) {
                            case true:
                                swal.close()
                                this.sendDB(id, estadoNuevo)
                                break;
                            default:
                                this.setState({ mostrarBody: true })
                                swal.close()
                        }
                    });
            }else{
                this.sendDB(id, estadoNuevo)
            }
        }
    }
    sendDB = (id, estadoNuevo) => {
        let Entregado = false;
        if (estadoNuevo === 4){
            Entregado = true;
        }
        // swal(id, `pasar a estado ${estadoNuevo}`);
        db.collection('pedidos').doc(id).update({
            estado: estadoNuevo
        }).then(() => {
            this.setState({ mostrarBody: true })
            db.collection('usuarios').doc(this.props.p.info.usuario).update({
                refresh: Math.random(0,1)
            }).then(()=>{
                this.props.onChangeEstado();
                if (Entregado){
                    swal({
                        title: "Entregaste el pedido!",
                        text: " ",
                        icon: "success",
                        button: null,
                        timer: 5000
                      });
                }
            }).catch((err)=> {
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
    componentDidMount = () => {
        // console.log("PROPS: ", this.props);
        var elems = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems, null);
    }
    fixTooltip() {

    }
    render() {
        const id = this.props.p.id
        const estado = this.props.p.info.estado
        const volverEstado = this.props.p.info.estado > 1 ? true : false
        const seguirEstado = this.props.p.info.estado < 3 ? true : false
        const completarPedido = this.props.p.info.estado === 3 ? true : false
        let i = 0;
        const { p } = this.props
        const tiempo = moment(p.info.horario_de_pedido.toDate()).locale('es').calendar()
        return (
            <li>
                <div className="collapsible-header" onClick={() => { this.changeIcon(); this.fixTooltip() }}>
                    {volverEstado && <span className="boton-mover-estado-r left">
                        <button onClick={() => this.cambiarEstado(id, estado, false)} className="btn btn-flat black-text icon-pedidos left tooltip">
                            <span className="tooltiptext">Mover pedido al estado anterior</span>
                            <i className="material-icons left">arrow_back</i>
                        </button>
                    </span>}
                    <div className="pedidos-header" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        <span className="center " >Pedido {p.id}</span><br />
                        {/* <i className="material-icons icon-pedidos icon-align">{icono}</i> */}
                    </div>
                    {seguirEstado && <span className="boton-mover-estado">
                        <button onClick={() => this.cambiarEstado(id, estado, true)} className="btn btn-flat black-text icon-pedidos tooltip">
                            <span className="tooltiptext">Mover pedido al siguiente estado</span>
                            <i className="material-icons right ">arrow_forward</i>
                        </button>
                    </span>
                    }
                    {completarPedido && <span className="boton-mover-estado ">
                        <button onClick={() => this.cambiarEstado(id, estado, true)} className="btn btn-flat black-text icon-pedidos tooltip btn-terminar-pedido">
                            <span className="tooltiptext">Marcar pedido como entregado</span>
                            <i className="material-icons right green-text">done</i>
                        </button>
                    </span>
                    }

                </div>
                {this.state.mostrarBody &&
                    <CollapsibleBody estado={p.info.estado} p={p} tiempo={tiempo} />}
            </li>
        )
    }
}

export default RestoItem

