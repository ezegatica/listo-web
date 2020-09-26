import React, { Component } from 'react'
import { db } from '../../Config/fbConfig'
import Filtros from '../Layout/Filtros'
import ShowRestaurante from './ShowRestaurante'
export class Restaurantes extends Component {
    state = {
        restaurantes: null
    }
    componentDidMount() {
        db.collection('restaurantes').orderBy("nombre", "asc").get()
            .then(snapshot => {
                const Restaurantes = []
                snapshot.forEach(doc => {
                    const info = doc.data()
                    const id = doc.id;
                    Restaurantes.push({ info, id })
                })
                this.setState({ restaurantes: Restaurantes })
            }).catch(error => console.log(error))
    }
    render() {
        console.log("STATE: ", this.state)
        let Cargando = this.state.restaurantes ?
            null :
            <div className="caja">
                <div className="centrado">
                    <div className="loadingio-spinner-bars-jl0izsh3cc"><div className="ldio-at0j3uszb4c">
                        <div></div><div></div><div></div><div></div>
                    </div></div>                    </div>
            </div>

        return (
            <div>
                <h3 className="center">Pedir comida!</h3>
                <Filtros />
                {Cargando}
                <div className="lista-restaurantes row">
                {this.state.restaurantes && this.state.restaurantes.map(restaurant => {
                    return (
                        <ShowRestaurante restaurant={restaurant} key={restaurant.id} />
                    )
                })}
                </div>
            </div>
        )
    }

}

export default Restaurantes