import React, { Component } from "react";
import Categorias from './Categorias'
import { connect } from 'react-redux'
import { SetCategorias } from '../../Actions/authActions'
import { Redirect } from "react-router-dom";
let MensajeError;

export class RestoSettings extends Component {
    state = {
        cat: this.props.Perfil.cat,
        cat2: this.props.Perfil.cat2,
        loading: false,
        cat1_vacio: false,
        cats_iguales: false
    }
    componentDidMount = () => {
        var elems = document.getElementById("sel");
        window.M.FormSelect.init(elems, {});
        var elems2 = document.getElementById("sel2");
        window.M.FormSelect.init(elems2, {});
    }
    Change = (e) => {
        console.log("CAMBIO!")
        MensajeError = ""
        this.setState({
            cat: e.target.value,
            loading: false,
            cat1_vacio: false,
            cats_iguales: false

        })
    }
    Change2 = (e) => {
        MensajeError = ""
        console.log("CAMBIO!")
        this.setState({
            cat2: e.target.value,
            loading: false,
            cat1_vacio: false,
            cats_iguales: false

        })
    }
    Submit = (e) => {
        MensajeError = ""
        e.preventDefault();
        this.setState({ loading: true })
        if (this.state.cat === this.state.cat2){return this.setState({cats_iguales: true})}
        if (this.state.cat === "") { console.log("CAT1 EMPTY"); this.setState({ cat1_vacio: true, loading: false }) }
        else { this.props.SetCategorias(this.state.cat, this.state.cat2) }
        if (this.state.cat2 === "") { console.log("CAT2 EMPTY"); }
    }
    render() {
        console.log("[STATE]", this.state)
        const { Perfil } = this.props;
        if (this.state.cat1_vacio){MensajeError = "Debes seleccionar una categoria principal";}
        if (this.state.cats_iguales){MensajeError = "Las 2 categorias no pueden ser iguales"}
        let ClasesBoton;
        if (this.state.loading) {
            ClasesBoton = "btn green disabled"
        }
        else {
            ClasesBoton = "btn green"
        }
        const Enviando = this.state.loading && !MensajeError ? <div className="center"><h4>Guardando...</h4></div> : null
        if (this.props.hecho){this.setState({loading:false}); return(<Redirect to="/profile"/>);}
        return (
            <>
                <p id="categoria">CATEGORIAS DE {Perfil.nombre}</p>
                <form onSubmit={this.Submit} >
                    <div className="input-field col s12">
                        <select value={this.state.cat} id="sel" onChange={this.Change}>
                            <option value="" disabled>Elije tu categoria principal</option>
                            <Categorias />
                        </select>
                        <label>Categoria principal <span className="red-text">*obligatorio</span></label>
                    </div>
                    <br />
                    <div className="input-field col s12">
                        <select value={this.state.cat2} id="sel2" onChange={this.Change2}>
                            <option value="">Vacio</option>
                            <Categorias />
                        </select>
                        <label>Categoria secundaria (opcional)</label>
                        <button className={ClasesBoton}>Submit!</button>
                        <div className="red-text bold">{MensajeError && MensajeError}</div>
                        {Enviando && Enviando}
                    </div>
                </form>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        hecho: state.auth.done
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        SetCategorias: (cat1, cat2) => dispatch(SetCategorias(cat1, cat2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestoSettings)
