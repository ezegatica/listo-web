import React, { Component } from 'react'
import { db } from '../../Config/fbConfig'
import { Link } from 'react-router-dom'
import Lista from '../Productos/Lista'
import E404Restaurantes from '../Pages/404Restaurantes'

export class RestauranteDetalles2 extends Component {
    state = {
        productos: null,
        nombreRestaurante: null,
        e404: null,
        imagen: null,
        cat1: null,
        cat2: null,
        done: false
    }

    componentDidMount() {
        let urlID = this.props.match.params.id;
        // console.log(urlID)

        db.collection('restaurantes').doc(urlID).get()
            .then(snapshot => {
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
                    console.log("EL ERROR BRO")
                    this.setState({ e404: true })
                }
            })
    }
    render() {
        if (this.state.e404 === true) {
            return (
                <E404Restaurantes />
            )
        }
        if (!this.state.e404 && this.state.done) {
            return (
                <div className="container">
                    <Link to="/restaurantes">Atras</Link>
                    <div className="center container fotoResto-container">
                        <img src={this.state.imagen || "https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/user.png?alt=media"} alt={"LOGO DE " + this.state.nombreRestaurante} className="responsive-img circle z-depth-3" draggable="false"/> <br />
                    </div>
                    <h4 className="center">{this.state.nombreRestaurante}</h4>
                    <p className="center"><b>Categorias:</b> {this.state.cat1}{this.state.cat2 && ", " + this.state.cat2}</p>
                    <hr />
                    <h4>Productos: </h4>
                    <Lista restaurante={this.props.match.params.id} />
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
export default RestauranteDetalles2