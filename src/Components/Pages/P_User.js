import React, { Component } from 'react'
import ShowRestaurante from '../Restaurante/ShowRestaurante'
import { db } from '../../Config/fbConfig'

export class PerfilUsuario extends Component {
    state = {
        restaurante: null
    }
    componentDidMount() {
        const Restaurantes = []
        const favs = this.props.profile.favoritos
        console.log("favoritos", favs);
        favs.forEach(id => {
            db.collection('restaurantes').doc(id).get()
            .then(snapshot => {
                const info = snapshot.data()
                const id = snapshot.id;
                Restaurantes.push({ info, id })
                this.setState({ restaurantes: Restaurantes })
            }).catch(error => console.log(error))
        })
    }
    render(props) {
        const perfil = this.props.profile
        return (
            <>
                <h4 className="center">Mis restaurantes favoritos:</h4>
                {
                    perfil.favoritos && perfil.favoritos.map(id => {
                        return (
                            <div key={id}>{id}</div>
                        )
                    })
                }
                <hr />
                {this.state.restaurantes && this.state.restaurantes.map(restaurant => {
                    return (
                        <ShowRestaurante restaurant={restaurant} key={restaurant.id} />
                    )
                })}
            </>
        )
    }
}

export default PerfilUsuario
