import React, { Component } from 'react'
import CategoriasResto from '../Config/CategoriasResto'
export class RestoSettings extends Component {
    render() {
        return (
            <>
                <CategoriasResto Perfil={this.props.Perfil} />
            </>
        )
    }
}

export default RestoSettings
