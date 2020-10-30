import React, { Component } from 'react'
import { db } from '../../../Config/fbConfig'
// import M from 'materialize-css'
import PedidoItem from './PedidoItem'
import { Link, } from 'react-router-dom'
export class ListaPedidos extends Component {
    state = {
        por_confirmar: null,
        profile: this.props.profile
    }
    componentDidMount() {
        this.leerDB();
    }
    leerDB = () => {
        this.setState({ por_confirmar: null })
        // console.log("LEYENDO DB!");
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
    componentDidUpdate =()=>{
        if (this.props.profile !== this.state.profile){
            this.setState({profile: this.props.profile})
            this.leerDB()
        }
    }
    render() {
        let indice = 0
        return (
            <>
                <button onClick={() => this.leerDB()} className="btn blue white-text">
                    <i className="material-icons">refresh</i>
                </button>
                <h5><b>PEDIDOS POR CONFIRMAR:</b></h5>
                <div className="blanquito" style={{padding: 20, borderRadius: 20}}>
                    {this.state.por_confirmar && this.state.por_confirmar.map(pedido => {
                    indice = indice + 1
                    return (
                        <PedidoItem pedido={this.state.por_confirmar[indice - 1]} key={pedido.id} />
                    )
                })}
                {!this.state.por_confirmar && <div>Cargando...</div>}
                </div>
                
                <div className="center">
                <Link to="/pedidos" className="btn btn-small blue white-text">
                        Ver lista completa!
                    </Link>

                </div>
                   

            </>
        )
    }
}

export default ListaPedidos
