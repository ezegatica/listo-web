import React from 'react'
import Lista from '../Productos/Lista'
import {auth} from '../../Config/fbConfig'

function PerfilResto() {
    return (
        <>
            <h4 className="center">Mis productos:</h4>
            <Lista restaurante={auth.currentUser.uid}/>
        </>
    )
}

export default PerfilResto
