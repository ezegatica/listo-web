import React, { Component } from "react";
import Categorias from './Categorias'
import {connect} from 'react-redux'
import {SetCategorias} from '../../Actions/authActions'
import { Redirect } from "react-router-dom";

export class RestoSettings extends Component {
    state={
        cat: this.props.Perfil.cat,
        cat2: this.props.Perfil.cat2,
        loading: false
    }
    componentDidMount = () => {
        var elems = document.getElementById("sel");
        window.M.FormSelect.init(elems, {});
        var elems2 = document.getElementById("sel2");
        window.M.FormSelect.init(elems2, {});
    }
    Change = (e) => {
        console.log("CAMBIO!")
        this.setState({
            cat: e.target.value,
            loading: false
        })
    }
    Change2 = (e) => {
        console.log("CAMBIO!")
        this.setState({
            cat2: e.target.value,
            loading: false
        })
    }
    Submit = (e) => { 
        e.preventDefault();
        this.setState({loading:true})
        this.props.SetCategorias(this.state.cat, this.state.cat2)
    }
    render() {
        console.log("[STATE]", this.state)
        const {Perfil} = this.props;
        let ClasesBoton;
        if (this.state.loading) {
            ClasesBoton = "btn green disabled"
        }
        else {
            ClasesBoton = "btn green"
        }
        const Enviando = this.state.loading ? <div className="center"><h4>Guardando...</h4></div> : null
        if (this.props.hecho){this.setState({loading:false}); return(<Redirect to="/profile"/>);}
        return (
            <>
            <p>CATEGORIAS DE {Perfil.nombre}</p>
                <form onSubmit={this.Submit} >
                <div className="input-field col s12">
                        <select value={this.state.cat} id="sel" onChange={this.Change}>
                            <option value="">Elije tu categoria principal</option>
                            <Categorias />
                        </select>
                        <label>Categoria principal</label>
                    </div>
                    <br/>
                    <div className="input-field col s12">
                        <select value={this.state.cat2} id="sel2" onChange={this.Change2}>
                            <option value="">Elije tu categoria secundaria</option>
                            <Categorias />
                        </select>
                        <label>Categoria secundaria</label>
                        <button className={ClasesBoton}>Submit!</button>
                        {Enviando && Enviando}
                    </div>
                </form>
            </>
        );
    }
}
const mapStateToProps= (state) =>{
    return {
        hecho: state.auth.done
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        SetCategorias: (cat1, cat2) => dispatch(SetCategorias(cat1, cat2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestoSettings)
