import React from 'react'
// import {Link} from 'react-router-dom'
import Preview from '../Posts/Preview'
const Home = () =>{
    document.title = process.env.REACT_APP_NAME + '';

    return(
        <div>
            <div className="container">
                <h4>Publicaciones del equipo:</h4>
                <div className="container">
                    <div className="row container">
                        <Preview />
                    </div>        
                 </div>
            </div>
            <br/>
            <br/>
            <br/>
            <hr/>
            <h3>Email: usu@r.io</h3>
            <h3>Contraseña: usuario</h3>
        </div>
    )
}

export default Home