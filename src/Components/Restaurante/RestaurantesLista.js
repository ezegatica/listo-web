import React, { Component } from 'react'
import { db } from '../../Config/fbConfig'
import Filtros from '../Layout/Filtros'
import ShowRestaurante from './ShowRestaurante'
import { connect } from 'react-redux'

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
                <h3 className="center">Pedir Comida!</h3>
                <Filtros />
                {Cargando}
                <div className="lista-restaurantes row">
                {this.state.restaurantes && this.props.profile.isLoaded && this.state.restaurantes.map(restaurant => {
                    return (
                        <ShowRestaurante restaurant={restaurant} key={restaurant.id} perfil={this.props.profile}/>
                    )
                })}
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile
    }
}
export default connect(mapStateToProps)(Restaurantes)