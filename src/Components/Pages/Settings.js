import React, { Component } from 'react'
import { deleteUser } from '../../Actions/authActions'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import RestoSettings from './RestoSettings'
export class Settings extends Component {
    state = {
        borrarPopUp: false,
        borrarConfirmacion: false,
    }
    BorrarCuentaSi = (e) => {
        e.preventDefault();
        this.props.deleteUser(this.props.auth.uid)
    }
    BorrarCuentaNo = () => {
        this.setState({ borrarPopUp: false, borrarConfirmacion: false })
    }
    render() {

        const btnBorrarCuenta = this.state.borrarPopUp ?
            <>
                <div>
                    <p className="bold">Estas seguro que quieres hacer esto?</p>
                    <button className="btn green" style={{ marginRight: 20 }} onClick={() => this.setState({ borrarConfirmacion: true, borrarPopUp: false })}>Si</button>
                    <button className="btn red" onClick={this.BorrarCuentaNo}>No</button>
                </div>
            </>
            : null

        const btnBorrarCuentaConfirmacion = this.state.borrarConfirmacion ?
            <>
                <div>
                    <h4 className="center red white-text bold">ESTAS SEGURO? (ESTA ACCION NO SE PUEDE DESHACER)</h4>
                    <button className="btn green" style={{ marginRight: 20 }} onClick={this.BorrarCuentaSi}>Si</button>
                    <button className="btn red" onClick={this.BorrarCuentaNo}>No</button>
                </div>
            </>
            : null
        if (this.props.auth.isLoaded && this.props.auth.uid === "iSOcYsCUziVYHIqspg0bfeNlCox2") {
            return (<Redirect to="/profile" />)
        }
        if (this.props.auth.isLoaded && !this.props.auth.uid) {
            return (<Redirect to="/login" />)
        }
        else {
            if (this.props.profile.isLoaded) {
                let ConfigResto
                if (this.props.profile.isResto) {
                    ConfigResto = <RestoSettings Perfil={this.props.profile} />
                }
                return (
                    <div className="container">
                        <h3 className="center">Configuración</h3>
                        <div className="center">{ConfigResto && ConfigResto}</div>
                        <br />
                        <hr />
                        <br />

                        <div className="center">
                            <button onClick={() => this.setState({ borrarPopUp: true })} className="btn red">Borrar Cuenta</button>
                            {btnBorrarCuenta}
                            {btnBorrarCuentaConfirmacion}
                        </div>

                    </div>
                )
            }
            else {
                return (
                    <div className="caja">
                        <div className="centrado">
                            <div className="loadingio-spinner-bars-jl0izsh3cc"><div className="ldio-at0j3uszb4c">
                                <div></div><div></div><div></div><div></div>
                            </div></div>
                        </div>
                    </div>
                )
            }

        }

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: (user) => dispatch(deleteUser(user))
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings)