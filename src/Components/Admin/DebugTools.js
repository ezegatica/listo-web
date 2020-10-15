import React, { Component } from 'react'
import { db, } from '../../Config/fbConfig'
import swal from 'sweetalert'
export class DebugTools extends Component {
    clearPedidos= () =>{
        db.collection('pedidos').get()
        .then((resp)=>{
            resp.docs.forEach((doc)=>{
                db.collection('pedidos').doc(doc.id).delete().then(()=>{
                    swal("Hecho", "Pedidos borrados!", "success")
                })
            })
        })
    }
    render() {
        
        return (
            <div className="container center">
                <button className="btn black white-text" onClick={()=>this.clearPedidos()}>Borrar pedidos (DEBUG)</button>
            </div>
        )
    }
}

export default DebugTools
