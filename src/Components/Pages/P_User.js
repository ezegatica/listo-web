import React, { Component } from 'react'
import ShowRestaurante from '../Restaurante/ShowRestaurante'
import { db, auth, fb } from '../../Config/fbConfig'
// import { connect } from 'react-redux'
import swal from 'sweetalert';

export class PerfilUsuario extends Component {
    state = {
        restaurantes: null,
    }


    leerDB = () => {
        const Restaurantes = []
        const favs = this.props.profile.favoritos
        this.setState({ restaurantes: null })
        // console.log("favoritos", favs);
        if (favs) {
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
    clearFavs = () => {
        const uid = auth.currentUser.uid
        console.log(uid);
        swal({
            title: "Cuidado!",
            text: "Estas seguro que quieres eliminar todos tus favoritos? Una vez hecho, no se puede volver atras...",
            icon: "warning",
            buttons: ["Cancelar", true],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    db.collection('usuarios').doc(uid).update({ "favoritos": fb.firestore.FieldValue.delete() }).then(() => {
                        this.leerDB()
                    }).catch((err) => { console.log(err); })
                    swal("Favoritos borrado!", {
                        icon: "success",
                    });
                } else {
                    
                }   
            });
    }
    render() {

        const perfil = this.props.profile
        return (
            <div className="">
                <h4 className="center">Mis restaurantes favoritos:</h4>
                {this.props.profile.favoritos && <div className="hover" style={{ userSelect: 'none' }} onClick={this.clearFavs}><p className="red-text"><i className="material-icons">delete</i>Borrar todos los favoritos</p></div>}
                {this.state.restaurantes && this.state.restaurantes.map(restaurant => {
                    return (
                        <ShowRestaurante restaurant={restaurant} key={restaurant.id} perfil={perfil} />
                    )
                })}
            </div>
        )
    }
}
// const mapStateToProps = (state) => {
//     return {
//         UpdateProfile: state.auth.UpdateProfile,
//     }
// }
// export default connect(mapStateToProps, null)(PerfilUsuario)
export default PerfilUsuario
