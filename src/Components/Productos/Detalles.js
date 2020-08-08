import React, { Component } from 'react'
import { db } from '../../Config/fbConfig'

export class Detalles extends Component {
    state = {
        producto: null,
    }

    componentDidMount() {
        let resID = this.props.match.params.id;
        let proID = this.props.match.params.productoid;
        console.log("PROPS: ", this.props)
        db.collection('usuarios').doc(resID).collection('productos').doc(proID).get()
            .then(snapshot => {
                const info = snapshot.data()
                const id = snapshot.id;
                this.setState({ producto: info, id })
            }).catch(error => console.log(error))
    }
    render() {
        if (this.state.producto !== null){
            return (
                <div>
                    <div className="container section project-details">
                        <div className="card z-depth-0">
                            <div className="card-content">
                                <span className="card-title">{this.state.producto.titulo}</span>
                                <hr />
                                <p>{this.state.producto.descripcion}</p>
                                <p>${this.state.producto.precio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className="center container">Loading...</div>
            )
        }
        
    }
}

export default Detalles
