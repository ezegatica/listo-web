import React, { Component } from 'react'
import { db, fb } from '../../Config/fbConfig'
import '../../css/admin.css'
export class MakeAdmin extends Component {
    state = {
        usuarios: null,
        user: null
    }
    leerDB(){
        db.collection('usuarios').where('isAdmin', '==', true).orderBy('nombre', 'desc').get()
            .then((snapshot) => {
                const Usuarios = []
                snapshot.forEach(doc => {
                    const info = doc.data()
                    const id = doc.id;
                    Usuarios.push({ info, id })
                })
                this.setState({ usuarios: Usuarios })
            }).catch((err) => {
                console.log(err);
            })
    }
    componentDidMount() {
        this.leerDB()
    }
    DeleteAdmin(id) {
        const uid = id;
        db.collection('usuarios').doc(uid).update({
            isAdmin: fb.firestore.FieldValue.delete()
        }).then(() => {
            this.leerDB()
            console.log("SUCCESS REMOVING ", uid, " AS AN ADMIN");
        }).catch((err) => {
            console.log(err);
        })
    }
    AddAdmin = (e) => {
        e.preventDefault();
        const uid = this.state.user;
        db.collection('usuarios').doc(uid).update({
            isAdmin: true
        }).then(() => {
            this.leerDB()
            console.log("SUCCESS ADDING ", uid, " AS AN ADMIN");
        }).catch((err) => {
            console.log(err);
        })
    }
    Change = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render() {
        return (
            <div className="container">

                <h5>Administradores:</h5>
                {this.state.usuarios && this.state.usuarios.map(user => {
                    return (
                        <div className="row admin-post-list" key={user.id}>
                            <p className="col s3 ">{user.info.nombre} {user.info.apellido && user.info.apellido}</p>
                            <p className="col s7 ">{user.id}</p>
                            <p className="col s2 "><span onClick={() => this.DeleteAdmin(user.id)}>retirar</span></p>
                            <p></p>
                        </div>
                    )
                })}
                <form onSubmit={this.AddAdmin}>
                    <div className="col s12">
                        Agregar nuevo:
                        <div className="input-field inline">
                            <input id="user" type="text" required={true} onChange={this.Change} />
                            <label htmlFor="user">UID</label>
                        </div>
                    </div>
                    <button className="btn black white-text"><i className="material-icons">send</i></button>

                </form>
            </div>
        )
    }
}

export default MakeAdmin
