import React, { Component } from 'react'
import M from 'materialize-css'
import swal from 'sweetalert'
export class Pedir extends Component {
    state = {

    }
    componentDidMount = () => {
        // console.log("PROPS PEDIR: ", this.props);
        var options
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, options);
        options = instances
        var options2
        var elems2 = document.querySelectorAll('.materialboxed');
        var instances2 = M.Materialbox.init(elems2, options2);
        options2 = instances2
        var options3
        var elems3 = document.querySelectorAll('select');
        var instances3 = M.FormSelect.init(elems3, options3);
        options3 = instances3
        var options4
        var elems4 = document.querySelectorAll('.timepicker');
        var instances4 = M.Timepicker.init(elems4, options4);
        options4 = instances4
    }
    metodoDePagoChange = (e) => {
        console.log("Metodo de pago:");
        console.log(e.target.value);
    }
    setHoraEntrega = (e) => {
        console.log(e);
    }
    pedir (e) {
        e.preventDefault()
        console.log("pedir!");
        swal("hola")
    }
    render() {
        let indice = 0;
        return (
            <div>
                <button data-target="modal1" className="btn modal-trigger">Ir a pagar!</button>
                <div id="modal1" className="modal">
                    <form onSubmit={this.pedir}>
                        <div className="modal-content">
                            <h4><b>Resumen del pedido</b></h4>
                            <p><b>Comentarios para el restaurante</b>: <i>{this.props.comentario}</i></p>
                            <p style={{margin: '0px'}}><b>Horario de entrega: </b> <span className="inline input-field" style={{margin: '0px'}}><input type="text" className="timepicker" placeholder="Haz click para seleccionar tu horario de entrega" onChange={this.setHoraEntrega} /></span></p>
                            <p><b>Cantidad de productos: </b>{this.props.cart.length} items</p>
                            <p><b>Tus productos:</b></p>
                            <div>
                                {this.props.cart.map(item => {
                                    indice = indice + 1
                                    return (

                                        <div key={item.producto} className="row card z-depth-0 blue card-pedir lighten-5">
                                            <div className="col s5 m5 l4 xl1">
                                                <img src={this.props.data[indice - 1].foto || "https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/producto.png?alt=media"} className="imagen-resumen-producto materialboxed" alt={"Foto del item: " + this.props.data[indice - 1].titulo} />
                                            </div>
                                            <div className="col s7 m7 l8 xl11">
                                                <div>{this.props.data[indice - 1].titulo} (x{item.cantidad})</div>
                                                <div>${this.props.data[indice - 1].precio}</div>
                                            </div>
                                        </div>

                                    )
                                })}
                                <div>
                                    <div className="input-field col s12">
                                        <p><b>Metodo de pago: </b></p>
                                        <p>
                                            <label>
                                                <input className="with-gap right" name="01" value={"01"} id="01" type="radio" checked onChange={this.metodoDePagoChange} />
                                                <span style={{ color: 'black' }}>Efectivo</span>
                                            </label><br />
                                            {/* <label title={"Proximanente..."}>
                                                <input className="with-gap right" name="02" value={"02"} id="02" type="radio" disabled/>
                                                <span>Tarjeta de credito</span>
                                            </label><br />
                                            <label title={"Proximanente..."}>
                                                <input className="with-gap right" name="03" value={"03"} id="03" type="radio" disabled/>
                                                <span>Mercado Pago</span>
                                            </label> */}
                                            <label >
                                                <span>Mas metodos proximanente...</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>
                                <p><b>Total: </b>${this.props.subtotal}</p>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-close waves-effect waves-white btn red">Cancelar</button>
                            <button className="waves-effect waves-green btn-flat" onClick={this.pedir}>Confirmar y pedir!</button>
                        </div>
                    </form>
                </div>
                <br />
            </div>
        )
    }
}

export default Pedir
