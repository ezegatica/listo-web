import React, { Component } from 'react'
import {auth} from '../../Config/fbConfig'
import { connect } from 'react-redux'
import { updateAlias } from '../../Actions/authActions'

let mensajeError;
export class AliasSettings extends Component {
    state = {
        alias: '',
        error:{
            YaExiste: false
        }
    }
    componentDidMount = () => {
        if (this.props.Perfil.alias !== undefined){
            this.setState({alias: this.props.Perfil.alias})
        }else{
            this.setState({alias: ''})
        }
        console.log("ALIASSETTINGS MOUNTED")
    }
    Change = (e) => {
        this.setState({
            alias: e.target.value
        })
    }
    Submit = (e) => {
        e.preventDefault();
        this.props.updateAlias(auth.currentUser.uid, this.state.alias)
    }
    render() {
        if (this.state.error.YaExiste){mensajeError="Este alias ya esta siendo usado!"}
        return (
            <>
                <h5 className="">Alias:</h5>
                <form onSubmit={this.Submit}>
                    <div className="row">
                        <div className="col s12">
                            prueba.proyecto.gati.ga/restaurante/
                            <div className="input-field inline">
                                <input value={this.state.alias} type="text" onChange={this.Change}  className="margin0 marginTop10"/>
                                <span className="helper-text red-text">{mensajeError}</span>
                            </div>
                            <button className="btn pink white-text"><i className="material-icons">save</i></button>
                        </div>
                    </div>
                </form>

            </>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateAlias: (alias, user) => dispatch(updateAlias(alias, user))
    }
}
export default connect(null, mapDispatchToProps)(AliasSettings)
