import React, { Component } from 'react'
import {connect} from 'react-redux'
import {sendLink} from '../../Actions/authActions'
import { Redirect } from 'react-router-dom'

export class Recovery extends Component {
    state = {
        email: ''
    }
    Change = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    Submit = (e) => { 
        // if (this.state.email !== ''){
            e.preventDefault();
            this.props.sendLink(this.state);
        
    }

    render() {
        const {authError, auth, mensaje} = this.props;
        if (auth.uid){
            return <Redirect to="/profile"/>
        }
        else{
            return (
                <div className="container">
                    <form onSubmit={this.Submit} className="white">
                        <h5 className="grey-text text-darken-3">Olvide mi contraseña</h5>
                        <p className="grey-text text-darken-1">Escribe tu direccion de mail y te enviaremos un email con la informacion para recuperar tu cuenta.</p>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange={this.Change} />
                        </div>
                        <div className="input-field">
                            <button className="btn pink lighten-1 z-depth-0 " >
                                Enviar mail
                            </button>
                            <div className="red-text center">
                                {authError ? <p>{authError}</p>: null}
                            </div>
                            <div className="green-text center">
                                {mensaje ? <p>{mensaje}</p>: null}
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth,
        mensaje: state.auth.mensaje
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        sendLink: (creds) => dispatch(sendLink(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recovery)
