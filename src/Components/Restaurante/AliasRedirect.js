import React, { Component } from 'react'
import { db } from '../../Config/fbConfig'
import {Redirect} from 'react-router-dom'
import E404Restaurantes from '../Pages/404Restaurantes'
export class AliasRedirect extends Component {
    state={
        e404: false,
        r: null,
        done: false
    }
    componentDidMount = () => {
        this.setState({e404:false, r: null, done:false})
        const url = this.props.match.params.alias
        db.collection('alias').doc(url).get()
        .then(snapshot => {
            const r = snapshot.data().restaurante
            this.setState({r: r, done: true})
        })
        .catch((err) => {
            this.setState({e404: true, done: true})
        })
    }
    
    render() {
        const {e404, r, done} = this.state
        if (done && r){
            return(
                <Redirect to={"/restaurantes/" + r} />

            )
        }
        if (done && e404){
            console.log("ERROR 404, restaurante no encontrado")
            return(
                <E404Restaurantes />       
            )
        }
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

export default AliasRedirect
