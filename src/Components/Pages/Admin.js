import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import SignUpResto from '../Auth/SignUpResto'
import ConvertToResto from '../Admin/ConvertToResto'
import Posts from '../Admin/Posts'
export class Admin extends Component {
    render() {
        if (this.props.profile.isLoaded) {
            if (this.props.profile.isAdmin) {
                return (
                    <>
                        <h3 className="center">Bienvenido al panel de control ultra-secreto</h3>
                        <hr />
                        <div className="container">
                            <SignUpResto />
                        </div>
                        <hr/>
                        <div className="container">
                            <Posts/>
                        </div>
                        <hr/>
                        <div className="container">
                            <ConvertToResto />
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