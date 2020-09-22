import React, { Component } from 'react'
import {auth} from '../../Config/fbConfig'
import { connect } from 'react-redux'
import { UpdateAlias, deleteAlias } from '../../Actions/authActions'

let mensajeError;
export class AliasSettings extends Component {
    state = {
        alias: '',
        loading: false
    }

    leerDB = () => {
        if (this.props.Perfil.alias !== undefined){
            this.setState({alias: this.props.Perfil.alias})
        }else{
            this.setState({alias: ''})
        }
        console.log("BASE DE DATOS LEIDA")
    }

    componentDidMount = () => {
        this.leerDB()
        console.log("ALIASSETTINGS MOUNTED")

    }
    Change = (e) => {
        this.setState({
            alias: e.target.value,
        })
        mensajeError = "";
    }
    Submit = (e) => {
        e.preventDefault();
        const alias = this.state.alias;
        const user = auth.currentUser.uid;
        const actual= this.props.Perfil.alias
        this.props.UpdateAlias(alias, user, actual)
    }
    Borrar = (e) => {
        e.preventDefault();
        const alias = this.props.Perfil.alias;
        const user = auth.currentUser.uid;
        this.props.deleteAlias(alias, user)
    }
    render() {
        if (this.props.YaExiste){mensajeError="Este alias ya esta siendo usado"}
        if (this.props.ElMismo){mensajeError="El nuevo alias no puede ser igual"}

        return (
            <>
                <h5 className="">Alias:</h5>
                <form onSubmit={this.Submit}>
                    <div className="row">
                        <div className="col s12">
                            prueba.proyecto.gati.ga/restaurante/
                            <div className="input-field inline">
                                <input value={this.state.alias} type="text" onChange={this.Change} required className="margin0 marginTop10"/>
                                <span className="helper-text red-text">{mensajeError}</span>
                            </div>
                            <button className="btn pink white-text"><i className="material-icons">save</i></button>
                            {this.props.Perfil.alias && <button onClick={this.Borrar} className="btn black white-text" style={{marginLeft: 10}}><i className="material-icons">delete</i></button>}
                        </div>
                    </div>
                </form>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        YaExiste: state.auth.YaExiste,
        ElMismo: state.auth.ElMismo,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        UpdateAlias: (alias, user, actual) => dispatch(UpdateAlias(alias, user, actual)),
        deleteAlias: (alias, user) => dispatch(deleteAlias(alias, user)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AliasSettings)
