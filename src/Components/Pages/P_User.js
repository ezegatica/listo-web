import React, { Component } from 'react'
import ShowRestaurante from '../Restaurante/ShowRestaurante'
import { db, auth, fb } from '../../Config/fbConfig'
// import { connect } from 'react-redux'
import swal from 'sweetalert';
import UsuarioItem from '../Pedidos/Usuario/UsuarioItem'
import { Link } from 'react-router-dom';
import M from 'materialize-css'
export class PerfilUsuario extends Component {
    state = {
        restaurantes: null,
        pedidos: null,
        cargado: false
    }

    leerDBPedidos = () => {
        console.log(auth.currentUser.uid);
        db.collection('pedidos').where('usuario', '==', auth.currentUser.uid).where('estado', '<', 4).orderBy('estado', 'asc').get()
            .then((resp) => {
                const Pedidos = []
                resp.forEach(doc => {
                    const info = doc.data()
                    const id = doc.id;
                    Pedidos.push({ info, id })
                })
                let Vacio = false
                if (Pedidos.length === 0) {
                    Vacio = true
                }
                this.setState({
                    pedidos: Pedidos,
                    cargado: true,
                    vacio: Vacio
                })
            }).catch(error => console.log(error))
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
        this.leerDBPedidos()
        var elems = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems, {

        });
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
        if (this.state.cargado) {
            console.log("PEDIDOS: ", this.state.pedidos);
        }
        const perfil = this.props.profile
        return (
            <div className="row">
                <div className="col s12 m6">
                    <Link to="/pedidos#activos"><h4 className="center titulo-link"><b>Mis pedidos activos:</b></h4></Link>
                    <ul className="collapsible" >
                        {this.state.cargado && !this.state.vacio && this.state.pedidos.map((pedido) => {
                            return (
                                <UsuarioItem activo={true} pedido={pedido} key={pedido.id} leerDB={() => this.leerDBPedidos()} showPics={false}/>
                            )
                        })}
                    </ul>
                    <Link to="/pedidos"><h5 className="center card-titulo"><b>Ver todos los pedidos!</b></h5></Link>
                    {!this.state.cargado && <div>cargando...</div>}
                    {!this.state.cargado && this.state.vacio && <div>Vacio</div>}
                </div>
                <div className="col s12 m6">
                    <h4 className="center"><b>Mis restaurantes favoritos:</b></h4>
                    {this.props.profile.favoritos && <div className="hover" style={{ userSelect: 'none' }} onClick={this.clearFavs}><p className="red-text"><i className="material-icons">delete</i>Borrar todos los favoritos</p></div>}
                    {this.state.restaurantes && this.state.restaurantes.map(restaurant => {
                        return (
                            <ShowRestaurante restaurant={restaurant} key={restaurant.id} perfil={perfil} fotoMasGrande={true} />
                        )
                    })}
                </div>
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
