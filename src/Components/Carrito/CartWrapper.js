import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Cart from './Cart'
import {auth} from '../../Config/fbConfig'
import '../../css/cart.css'
export class CartWrapper extends Component {
    render() {
        if (this.props.profile.isLoaded && !this.props.profile.isResto && !this.props.profile.isEmpty) {
            return (
                <div className="container">
                    <Cart profile={this.props.profile} auth={auth}/>
                </div>
            )
        } else {
            if (this.props.profile.isResto && this.props.profile.isLoaded) {
                return (<Redirect to="/" />)
            } else {
                if (this.props.profile.isLoaded && this.props.profile.isEmpty) {
                    return (<Redirect to="/" />)
                } else {
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
}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile
    }
}
export default connect(mapStateToProps)(CartWrapper)