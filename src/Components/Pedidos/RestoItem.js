import React, { Component } from 'react'
import M from 'materialize-css'
import moment from 'moment'
import 'moment/locale/es'
export class RestoItem extends Component {
    state={
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
    changeIcon = ()=>{
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
    componentDidMount = () => {
        console.log("PROPS: ", this.props);
        var options
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems, options);
        options = instances;
    }
    render() {
        const icono = this.state.collapsed ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
        let i = 0;
        const { p } = this.props
        const metodo_de_pago = this.metodo_de_pago(p.info.metodo_de_pago)
        const tiempo = moment(p.info.horario_de_pedido.toDate()).locale('es').calendar()
        if (p.info.estado === 0 || p.info.estado === 3){
            return (
                <li>
                    <div className="collapsible-header"  onClick={()=>this.changeIcon()}><i className="material-icons">{icono}</i>Pedido {p.id}</div>
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
                            {/* <p><b>Pedido a las:</b> {moment (p.info.horario_de_pedido.toDate()).format('LT')}</p> */}
                            <p><b>Pedido a las:</b> {tiempo}</p>
                        </div>
                    </span></div>
                </li>
            )
        }else{
            return(
                <li>
                    <div className="collapsible-header"  onClick={()=>this.changeIcon()}><i className="material-icons">{icono}</i>Pedido {p.id}</div>
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

