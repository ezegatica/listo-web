import React, { Component } from 'react'
import M from 'materialize-css'
export class Pedir extends Component {
    componentDidMount = () => {
        console.log("PROPS PEDIR: ", this.props);
        var options
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, options);
        options = instances
    }
    render() {
        return (
            <div>
                <button data-target="modal1" className="btn modal-trigger">Ir a pagar!</button>
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4><b>Resumen del pedido</b></h4>
                        <p><b>Comentarios para el restaurante</b>: <i>{this.props.comentario}</i></p>
                        <p><b>Cantidad de productos: </b>{this.props.cart.length}</p>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Pedir
