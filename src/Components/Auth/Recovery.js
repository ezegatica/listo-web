import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendLink } from '../../Actions/authActions'

export class Recovery extends Component {
    state = {
        email: '',
        enviado: false
    }
    Change = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
            enviado: false
        })
    }
    Submit = (e) => {
        // if (this.state.email !== ''){
        e.preventDefault();
        this.setState({
            enviado: true
        })
        this.props.sendLink(this.state);
    }

    render() {
        const { authError, mensaje} = this.props;
        let Enviando = this.state.enviado ? <p>Enviando...</p> : null
        let asd;
        if (this.state.enviado){
            asd = "btn pink lighten-1 z-depth-0 disabled"
        } else{
            asd = "btn pink lighten-1 z-depth-0"
        }
        if (mensaje){
            Enviando = null
        }
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
                        <button className={asd} >
                            Enviar mail
                            </button>
                        <div className="red-text center">
                            {authError ? <p>{authError}</p> : null}
                        </div>
                        {!authError && Enviando}

                        <div className="green-text center">
                            {mensaje ? <p>{mensaje}</p> : null}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        mensaje: state.auth.mensaje
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendLink: (creds) => dispatch(sendLink(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recovery)
