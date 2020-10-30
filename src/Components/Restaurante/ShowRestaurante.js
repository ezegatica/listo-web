import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { auth, db, fb } from '../../Config/fbConfig'
import '../../css/restaurantes.css'
// import M from 'materialize-css'
export class ShowRestaurante extends Component {
    state = {
        logged: null,
        uid: null,
        liked: null,
    }
    componentDidMount = () => {
        // var options
        // var elems = document.querySelectorAll('.materialboxed');
        // var instances = M.Materialbox.init(elems, options);
        // options = instances
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
    handleFav = () => {
        if (this.state.liked) {
            this.borrarFav()
        } else {
            this.addFav()

        }
    }
    addFav = () => {
        const RESTO = this.props.restaurant.id
        const uid = this.state.uid
        db.collection('usuarios').doc(uid).update({ "favoritos": fb.firestore.FieldValue.arrayUnion(RESTO) }).then(() => {
            this.setState({ liked: true })
        }).catch((err) => { console.log(err); })
    }
    borrarFav = () => {
        const RESTO = this.props.restaurant.id
        const uid = this.state.uid
        db.collection('usuarios').doc(uid).update({ "favoritos": fb.firestore.FieldValue.arrayRemove(RESTO) }).then(() => {
            this.setState({ liked: false })
        }).catch((err) => { console.log(err); })
    }

    render() {
        let classDivFoto
        let classDivTexto
        if (this.props.fotoMasGrande) {
            classDivFoto = "col s4 m3 l3 xl2 xxl2"
            classDivTexto = "col s8 m9 l9 xl10 xxl10"

        } else {
            classDivFoto = "col s4 m3 l3 xl2 xxl1"
            classDivTexto = "col s8 m9 l9 xl10 xxl11"
        }
        const { restaurant } = this.props
        let Fav = ""
        if (this.state.logged && !this.props.perfil.isResto) {
            Fav = this.state.liked ? "favorite" : "favorite_border"
        }
        if (restaurant.info) {
            return (
                <Link to={"/restaurantes/" + restaurant.id}>
                    <div className="card proyect-summary blanquito sombrita" style={{ borderRadius: 20 }}>
                        <div className="card-content grey-text text-darken-3 lista-proyectos row">
                            <div className={classDivFoto}>
                                <img src={restaurant.info.foto || 'https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/user.png?alt=media'} alt={"IMG"} draggable="false" className=" circle z-depth-3 imagen-lista resposive-img" /> <br />
                            </div>
                            <div className={classDivTexto}>
                                <div>{Fav && <i className="material-icons left hover restaurante-fav" onClick={this.handleFav}>{Fav}</i>}<span className="card-title" title={restaurant.info.nombre}>{restaurant.info.nombre}</span></div>
                                <div className="categorias-display"><p>Categorias: <span className="cat1">{restaurant.info.cat}</span><span className="cat2">{restaurant.info.cat2 && ", " + restaurant.info.cat2}</span></p></div>
                            </div>
                        </div>
                    </div>
                </Link>
            )
        } else {
            return null
        }

    }
}

export default ShowRestaurante