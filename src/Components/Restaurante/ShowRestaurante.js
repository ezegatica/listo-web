import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { auth, db, fb } from '../../Config/fbConfig'
// import { connect } from 'react-redux'
// import {UpdateProfileWithNewFavs} from '../../Actions/authActions'
export class ShowRestaurante extends Component {
    state = {
        logged: null,
        uid: null,
        liked: null,
    }
    componentDidMount = () => {
        if (this.props.perfil.isEmpty && this.props.perfil.isLoaded) {
            this.setState({ logged: false })
        }
        else {
            this.setState({ logged: true, uid: auth.currentUser.uid })
        }
        if (this.props.perfil.favoritos && this.props.perfil.favoritos.includes(this.props.restaurant.id)) { 
            this.setState({ liked: true }) 
        } 
        else {
             this.setState({ liked: false }) 
        }
    }
    handleFav =  () => {
        // console.log("user: ", this.state.uid, " \nresto: ", this.props.restaurant.info.nombre, "\nestá likeado? ",this.state.liked);
        if (this.state.liked){
            this.borrarFav()
            // this.props.UpdateProfileWithNewFavs()
        }else{
            this.addFav()

        }
    }
    addFav = () => {
        const RESTO = this.props.restaurant.id
        const uid = this.state.uid
        db.collection('usuarios').doc(uid).update({"favoritos": fb.firestore.FieldValue.arrayUnion(RESTO)}).then(() => {
            this.setState({liked: true})
        }).catch((err) => {console.log(err);})
    }
    borrarFav = () => {
        const RESTO = this.props.restaurant.id
        const uid = this.state.uid
        db.collection('usuarios').doc(uid).update({"favoritos": fb.firestore.FieldValue.arrayRemove(RESTO)}).then(() => {
            this.setState({liked: false})
        }).catch((err) => {console.log(err);})
    }

    render() {
        const { restaurant } = this.props
        let Fav = ""
        if (this.state.logged && !this.props.perfil.isResto) {
            Fav = this.state.liked ? "favorite" : "favorite_border"
        }
        return (
            <div className="card z-depth-0 proyect-summary grey lighten-3">
                <div className="card-content grey-text text-darken-3 lista-proyectos row">
                    <div className="col s4 m3 l2 xl1">
                        <img src={restaurant.info.foto || 'https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/user.png?alt=media'} alt={"IMG"} draggable="false" className=" circle z-depth-3 imagen-lista" /> <br />
                    </div>
                    <div className="col s8 m9 l10 xl11">
                        <div>{Fav && <i className="material-icons left hover restaurante-fav" onClick={this.handleFav}>{Fav}</i>}<Link to={"/restaurantes/" + restaurant.id}><span className="card-title" title={restaurant.info.nombre}>{restaurant.info.nombre}</span></Link></div>
                        <div><p>Categorias: {restaurant.info.cat}{restaurant.info.cat2 && ", " + restaurant.info.cat2}</p></div>
                    </div>
                </div>
            </div>
        )
    }
}
// const mapDispatchToProps = (dispatch) => {
//     return {
//         UpdateProfileWithNewFavs: () => dispatch(UpdateProfileWithNewFavs())
//     }
// }

// export default connect(null, mapDispatchToProps)(ShowRestaurante)
export default ShowRestaurante
