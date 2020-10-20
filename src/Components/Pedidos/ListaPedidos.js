import React, { Component } from 'react'
import { db } from '../../Config/fbConfig'
// import M from 'materialize-css'
import PedidoItem from './PedidoItem'
export class ListaPedidos extends Component {
    state = {
        por_confirmar: null
    }
    componentDidMount() {
        this.leerDB();
    }
    leerDB = () => {
        this.setState({por_confirmar: null})
        console.log("LEYENDO DB!");
        // AGARRAR TOODS LOS PEDIDOS NO TERMINADOS (PENDIENTES) 
        db.collection('pedidos').where('restaurante', '==', this.props.uid).where('estado', '==', 0).orderBy('horario_de_pedido', 'desc').get()
            // db.collection('pedidos').where('restaurante', '==', this.props.uid).where('estado', '==', 0).orderBy('horario_de_pedido', 'desc').get()
            .then((resp) => {
                const Pedidos = []
                resp.forEach(doc => {
                    const info = doc.data()
                    const id = doc.id;
                    Pedidos.push({ info, id })
                })
                this.setState({ por_confirmar: Pedidos })
            }).catch(error => console.log(error))
    }
    render() {
        let indice = 0
        return (
            <>
                <button onClick={() => this.leerDB()} className="btn blue black-text">
                    <i className="material-icons">refresh</i>
                </button>
                <h5><b>PEDIDOS POR CONFIRMAR:</b></h5>
                {this.state.por_confirmar && this.state.por_confirmar.map(pedido => {
                    indice = indice + 1
                        return (
                            <PedidoItem pedido={this.state.por_confirmar[indice - 1]} key={pedido.id} />
                        )
                })}
                {!this.state.por_confirmar && <div>cargando...</div>}

            </>
        )
    }
}

export default ListaPedidos
