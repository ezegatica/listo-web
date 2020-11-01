import React, { Component } from 'react'
import { db, fb } from '../../Config/fbConfig'
import { Link, } from 'react-router-dom'
import Lista from '../Productos/Lista'
import E404Restaurantes from '../Pages/404Restaurantes'
import { connect } from 'react-redux'

export class RestauranteDetalles2 extends Component {
    state = {
        nombreRestaurante: null,
        e404: null,
        imagen: null,
        cat1: null,
        cat2: null,
        done: false,
        id: null,
        uid: null,
        bugfix: false,
        liked: null,
        logged: null
    }
    leerDB = (condition) => {
        if (condition) { this.setState({ bugfix: true }); console.log("BUGFIXING!"); }
        if (this.props.profile.isEmpty && this.props.profile.isLoaded) {
            this.setState({ logged: false })
        }
        else {
            this.setState({ logged: true, uid: this.props.auth.uid })
        }
        if (this.props.profile.favoritos && this.props.profile.favoritos.includes(this.props.match.params.id)) {
            // console.log("esta faveado");
            this.setState({ liked: true })
        }
        else {
            // console.log("no esta faveado");

            this.setState({ liked: false })
        }
    }
    handleFav = () => {
        // console.log("user: ", this.state.uid, " \nresto: ", this.props.restaurant.info.nombre, "\nestá likeado? ",this.state.liked);
        if (this.state.liked) {
            this.borrarFav()
            // this.props.UpdateProfileWithNewFavs()
        } else {
            this.addFav()
        }
    }
    addFav = () => {
        const RESTO = this.state.id
        const uid = this.state.uid
        db.collection('usuarios').doc(uid).update({ "favoritos": fb.firestore.FieldValue.arrayUnion(RESTO) }).then(() => {
            console.log("agregado!");
            this.setState({ liked: true })
        }).catch((err) => { console.log(err); })
    }
    borrarFav = () => {
        const RESTO = this.state.id
        const uid = this.state.uid
        db.collection('usuarios').doc(uid).update({ "favoritos": fb.firestore.FieldValue.arrayRemove(RESTO) }).then(() => {
            console.log("borrado!");
            this.setState({ liked: false })
        }).catch((err) => { console.log(err); })
    }
    componentDidMount() {
        document.title = process.env.REACT_APP_NAME;
        let urlID = this.props.match.params.id;
        this.setState({
            id: urlID
        })
        // console.log(urlID)
        this.leerDB(false)
        db.collection('restaurantes').doc(urlID).get()
            .then(snapshot => {
                document.title = process.env.REACT_APP_NAME + ' - ' + snapshot.data().nombre;
                this.setState({
                    nombreRestaurante: snapshot.data().nombre,
                    imagen: snapshot.data().foto,
                    cat1: snapshot.data().cat,
                    cat2: snapshot.data().cat2,
                    done: true
                })
            }).catch(error => {
                console.log(error)
                if (error.message === "Cannot read property 'nombre' of undefined") {
                    console.log(error)
                    this.setState({ e404: true })
                }
            })
    }
    componentWillUnmount = () => {
        this.setState({ bugfix: false })
    }
    render() {
        let Fav = ""
        if (this.state.logged && !this.props.profile.isResto) {
            Fav = this.state.liked ? "favorite" : "favorite_border"
        }
        if (this.state.logged && !this.state.uid && !this.state.bugfix && this.props.auth.uid && this.props.auth.isLoaded && !this.props.auth.isEmpty && this.props.profile.isLoaded) {
            this.leerDB(true)
        }
        if (this.state.e404 === true) {
            return (
                <E404Restaurantes />
            )
        }
        if (!this.state.e404 && this.state.done) {
            return (
                <div className="container">
                    <div>
                        <Link to="/restaurantes">Atras</Link>
                        {!this.props.auth.isEmpty && this.props.auth.isLoaded && <span style={{ float: 'right' }}>
                            <i className="material-icons hover restaurante-fav" onClick={this.handleFav}>{Fav}</i>
                        </span>}
                    </div>
                    <div className="center container fotoResto-container">
                        <img src={this.state.imagen || "https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/user.png?alt=media"} alt={"LOGO DE " + this.state.nombreRestaurante} className="responsive-img circle z-depth-3" draggable="false" /> <br />
                    </div>
                    <h4 className="center">{this.state.nombreRestaurante}</h4>
                    <p className="center"><b>Categorias:</b> <span className="capitalize">{this.state.cat1}{this.state.cat2 && ", " + this.state.cat2}</span></p>
                    <hr />
                    {/* <h4>Productos: </h4> */}
                    <Lista restaurante={this.props.match.params.id} auth={this.props.auth} profile={this.props.profile} />
                </div>
            )
        } else {
            return (
                <div className="center">
                    <div className="loadingio-spinner-bars-jl0izsh3cc"><div className="ldio-at0j3uszb4c">
                        <div></div><div></div><div></div><div></div>
                    </div></div>
                </div>
            )
        }

    }
}
const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth,

    }
}

export default connect(mapStateToProps)(RestauranteDetalles2)