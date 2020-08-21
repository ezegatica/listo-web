import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import SignUpResto from '../Auth/SignUpResto'

export class Admin extends Component {
    render() {
        if (this.props.profile.isLoaded) {
            if (this.props.profile.isAdmin) {
                return (
                    <>
                        <h1 className="center">Hola Admin!</h1>
                        <h3 className="center">Bienvenido al panel de control ultra-secreto</h3>
                        <hr />
                        <div className="container">
                            <SignUpResto />
                        </div>
                    </>
                )
            }
            else {
                return (
                    <Redirect to="/profile" />
                )
            }
        } else {
            return (
                <div className="caja">
                    <div className="centrado">
                        <div className="loadingio-spinner-bars-jl0izsh3cc"><div className="ldio-at0j3uszb4c">
                            <div></div><div></div><div></div><div></div>
                        </div></div>
                    </div>
                </div>)
        }

    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Admin)