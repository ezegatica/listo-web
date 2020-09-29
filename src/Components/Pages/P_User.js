import React, { Component } from 'react'
import ShowRestaurante from '../Restaurante/ShowRestaurante'
import { db, } from '../../Config/fbConfig'
import { connect } from 'react-redux'

export class PerfilUsuario extends Component {
    state = {
        restaurante: null,
        update: false,
        updated: false
    }
    
    
    leerDB = () => {
        const Restaurantes = []
        const favs = this.props.profile.favoritos
        console.log("favoritos", favs);
        if (favs){
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
        
    }
    componentDidMount() {
        this.leerDB()
    }
    render(props) {
        
        const perfil = this.props.profile
        return (
            <>
                <h4 className="center">Mis restaurantes favoritos:</h4>
                {this.state.restaurantes && this.state.restaurantes.map(restaurant => {
                    return (
                        <ShowRestaurante restaurant={restaurant} key={restaurant.id} perfil={perfil}/>
                    )
                })}
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        UpdateProfile: state.auth.UpdateProfile,
    }
}
export default connect(mapStateToProps, null)(PerfilUsuario)
