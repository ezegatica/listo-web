import React, { Component } from 'react'
import { db } from '../../Config/fbConfig'
import moment from 'moment'
import '../../css/admin.css'

export class Posts extends Component {
    state = {
        publicaciones: null,
    }
    leerDB() {
        db.collection('publicaciones').orderBy("createdAt", "desc").limit(5).get()
            .then((snapshot) => {
                const Posteos = []
                snapshot.forEach(doc => {
                    const info = doc.data()
                    const id = doc.id;
                    Posteos.push({ info, id })
                })
                this.setState({ publicaciones: Posteos })
            }).catch((err) => {
                console.log(err);
            })
    }
    componentDidMount = () => {
        this.leerDB()
    }
    Submit = (e) => {
        e.preventDefault();
        const {titulo, body} = this.state
        db.collection('publicaciones').add({
            titulo: titulo,
            body: body,
            createdAt: new Date()
        }).then((resp) => {
            this.leerDB()
        }).catch((err) => {
            console.log(err);
        })
    }
    Change = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    delete = (id) => {
        db.collection('publicaciones').doc(id).delete()
        .then(() => {
            this.leerDB()
        }).catch((err) => {
            console.log(err);
        })    
    }
    render() {
        return (
            <div className="container">
                <h5>Posteos:</h5>
                {this.state.publicaciones && this.state.publicaciones.map(message => {
                    return (
                        <div className="row admin-post-list" key={message.id}>
                            <p className="col s3 ">{message.info.titulo}</p>
                            <p className="col s5 ">{message.id}</p>
                            <p className="col s2 ">{moment(message.info.createdAt.toDate()).calendar()}</p>
                            <p className="col s2 "><span >editar</span> | <span onClick={() => this.delete(message.id)}>borrar</span></p>
                            <p></p>
                        </div>
                    )
                })}
                {this.state.publicaciones && this.state.publicaciones.length === 0 && <div>
                    <p>Lista vacía!</p>
                    </div>}
                <hr />
                <h5 style={{ marginBottom: 5 }}>Añadir post:</h5>
                <form onSubmit={this.Submit}>
                    <div className="input-field">
                        <label htmlFor="titulo">Titulo</label>
                        <input type="text" id="titulo" onChange={this.Change} required={true} />
                    </div>
                    <div className="input-field">
                    <label htmlFor="body">Contenido del Proyecto:</label>
                        <textarea id="body" className="materialize-textarea" onChange={this.Change} required={true}></textarea>
                    </div>
                    <div className="input-field">
                        <button className="btn black white-text"><i className="material-icons">send</i></button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Posts
