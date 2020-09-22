import React, { Component } from 'react'
import CategoriasResto from '../Settings/CategoriasResto'
import AliasSettings from '../Settings/AliasSettings'
export class RestoSettings extends Component {
    render() {
        return (
            <>
                <CategoriasResto Perfil={this.props.Perfil} />
                <hr />

                <AliasSettings Perfil={this.props.Perfil}/>
            </>
        )
    }
}

export default RestoSettings
