import React, { Component } from 'react'
import ShowRestaurante from '../Restaurante/ShowRestaurante'
import { db, auth, fb } from '../../Config/fbConfig'

export class PerfilUsuario extends Component {
    state = {
        restaurante: null
    }
    borrarFav = (id) => {
        const uid = auth.currentUser.uid
        console.log("ID :",id);
        db.collection('usuarios').doc(uid).update({"favoritos": fb.firestore.FieldValue.arrayRemove(id)}).then(() => {
            console.log("success!");
            this.leerDB()

        }).catch((err) => {console.log(err);})
    }
    addFav = () => {
        const uid = auth.currentUser.uid
        db.collection('usuarios').doc(uid).update({"favoritos": fb.firestore.FieldValue.arrayUnion("Fw0JV2TtEXN3xHM2JD1q9EtN9Ov2")}).then(() => {
            console.log("success!");
            this.leerDB()
        }).catch((err) => {console.log(err);})
    }
    leerDB = () => {
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
    componentDidMount() {
        this.leerDB()
    }
    render(props) {
        const perfil = this.props.profile
        return (
            <>
                <h4 className="center">Mis restaurantes favoritos:</h4>
                {
                    perfil.favoritos && perfil.favoritos.map(id => {
                        return (
                            <div key={id}>
                            <p >ID: {id}</p>
                            <button className="btn red" onClick={() => this.borrarFav(id)}><i className="material-icons" >delete</i>borrar</button>
                            <button className="btn red" onClick={() => this.addFav()}><i className="material-icons" >add</i>agregar prueba</button>
                            <br/>
                            <br/>
                            </div>
                        )
                    })
                }
                <hr />
                {this.state.restaurantes && this.state.restaurantes.map(restaurant => {
                    return (
                        <ShowRestaurante restaurant={restaurant} key={restaurant.id} perfil={perfil}/>
                    )
                })}
            </>
        )
    }
}

export default PerfilUsuario
