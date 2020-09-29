import React, { Component } from 'react'
import ShowRestaurante from '../Restaurante/ShowRestaurante'
import { db, auth } from '../../Config/fbConfig'
// import { connect } from 'react-redux'
import swal from 'sweetalert';

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
    clearFavs = () => {
        const uid = auth.currentUser.uid
        console.log(uid);
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
            //   swal("Your imaginary file is safe!");
            }
          });
    }
    render() {
        
        const perfil = this.props.profile
        return (
            <>
                <h4 className="center">Mis restaurantes favoritos:</h4> 
                <div className="hover" style={{userSelect: 'none'}} onClick={this.clearFavs}><p className="red-text"><i className="material-icons">delete</i>Borrar todos los favoritos</p></div>
                {this.state.restaurantes && this.state.restaurantes.map(restaurant => {
                    return (
                        <ShowRestaurante restaurant={restaurant} key={restaurant.id} perfil={perfil}/>
                    )
                })}
            </>
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
